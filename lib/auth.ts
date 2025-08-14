import type {
  NextAuthOptions,
  User as NextAuthUser,
  Profile as NextAuthProfile,
  Session,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? "";
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID ?? "";

// Log configuration for debugging
console.log("Auth Config:", {
  hasClientId: !!DISCORD_CLIENT_ID,
  hasClientSecret: !!DISCORD_CLIENT_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET ? "SET" : "MISSING",
});

type DiscordProfile = NextAuthProfile & {
  id: string | number;
  username?: string;
  global_name?: string;
  email?: string | null;
  avatar?: string | null;
};

async function upsertUserFromDiscord(
  profile: DiscordProfile,
  accessToken: string,
): Promise<NextAuthUser> {
  const discordId: string = String(profile.id);
  const username: string = profile.username || profile.global_name || "user";
  const email: string | null = profile.email ?? null;
  const avatar: string | null = profile.avatar
    ? `https://cdn.discordapp.com/avatars/${discordId}/${profile.avatar}.png`
    : null;

  try {
    const user = await prisma.user.upsert({
      where: { discordId },
      update: {
        username,
        email: email ?? undefined,
        avatar: avatar ?? undefined,
      },
      create: { discordId, username, email, avatar },
    });

    // Attempt to fetch guild membership to infer roles
    if (accessToken && DISCORD_GUILD_ID) {
      try {
        const resp = await fetch(
          `https://discord.com/api/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        if (resp.ok) {
          const data = await resp.json();
          const roleIds: string[] = Array.isArray(data?.roles)
            ? data.roles
            : [];
          // Basic mapping placeholder; in real use, map Discord role IDs to Role enum
          const highestRole: Role =
            roleIds.length > 0 ? Role.SQUIRE : Role.PEASANT;
          await prisma.userRole
            .create({
              data: { userId: user.id, role: highestRole, source: "DISCORD" },
            })
            .catch(() => undefined);
        }
      } catch {
        // ignore
      }
    }

    return {
      id: user.id,
      name: user.username,
      email: user.email ?? undefined,
      image: user.avatar ?? undefined,
    } as NextAuthUser;
  } catch (error) {
    console.error("Error upserting user:", error);
    // Return a basic user object if database fails
    return {
      id: discordId,
      name: username,
      email: email ?? undefined,
      image: avatar ?? undefined,
    } as NextAuthUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      authorization: {
        params: { scope: "identify email guilds.members.read" },
      },
      profile(profile) {
        const p = profile as DiscordProfile;
        return {
          id: String(p.id),
          name: p.username ?? p.global_name ?? "user",
          email: p.email ?? undefined,
          image: null,
        } as NextAuthUser;
      },
    }),
  ],
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ account, profile }): Promise<boolean> {
      console.log("SignIn callback:", {
        hasAccount: !!account,
        hasProfile: !!profile,
      });
      if (account?.provider === "discord" && account.access_token && profile) {
        try {
          await upsertUserFromDiscord(
            profile as DiscordProfile,
            account.access_token,
          );
          return true;
        } catch (error) {
          console.error("SignIn error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "discord" && account.access_token && profile) {
        try {
          const user = await upsertUserFromDiscord(
            profile as DiscordProfile,
            account.access_token,
          );
          token.uid = user.id;
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token?.uid) {
        (session as Session & { userId?: string }).userId = String(token.uid);
      }
      return session;
    },
  },
};
