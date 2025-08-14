import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  env: {
    DATABASE_URL:
      process.env.DATABASE_URL || "postgres://localhost:5432/the_network",
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL || "https://thenetwork2.onrender.com",
    NEXTAUTH_SECRET:
      process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "",
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || "",
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || "",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
    S3_ENDPOINT: process.env.S3_ENDPOINT || "",
    S3_BUCKET: process.env.S3_BUCKET || "",
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || "",
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || "",
    REDIS_URL: process.env.REDIS_URL || "",
  },
};

export default nextConfig;
