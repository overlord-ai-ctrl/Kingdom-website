import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],
  env: {
    DATABASE_URL:
      process.env.DATABASE_URL || "postgres://localhost:5432/the_network",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET:
      process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  },
};

export default nextConfig;
