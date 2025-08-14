import type {
  NextAuthOptions,
  User as NextAuthUser,
  Profile as NextAuthProfile,
  Session,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/prisma";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? "";

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
  pages: {
    error: "/error",
    signIn: "/dashboard",
  },
  callbacks: {
    async signIn({ account, profile }): Promise<boolean> {
      console.log("SignIn callback:", {
        hasAccount: !!account,
        hasProfile: !!profile,
      });
      if (account?.provider === "discord" && account.access_token && profile) {
        try {
          await upsertUserFromDiscord(profile as DiscordProfile);
          return true;
        } catch (error) {
          console.error("SignIn error:", error);
          // Don't fail the sign-in, just log the error
          return true;
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "discord" && account.access_token && profile) {
        try {
          const user = await upsertUserFromDiscord(profile as DiscordProfile);
          token.uid = user.id;
        } catch (error) {
          console.error("JWT callback error:", error);
          // Don't fail the JWT callback
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
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to dashboard
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      // Allow relative callback URLs
      else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
};
