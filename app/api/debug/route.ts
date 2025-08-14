import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface DebugInfo {
  timestamp: string;
  environment: string | undefined;
  hasDiscordClientId: boolean;
  hasDiscordClientSecret: boolean;
  nextAuthUrl: string | undefined;
  hasNextAuthSecret: boolean;
  databaseUrl: string;
  database?: string;
  databaseError?: string;
}

export async function GET() {
  const debug: DebugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasDiscordClientId: !!process.env.DISCORD_CLIENT_ID,
    hasDiscordClientSecret: !!process.env.DISCORD_CLIENT_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    databaseUrl: process.env.DATABASE_URL ? "SET" : "MISSING",
  };

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    debug.database = "connected";
  } catch (error) {
    debug.database = "error";
    debug.databaseError =
      error instanceof Error ? error.message : "Unknown error";
  }

  return NextResponse.json(debug);
}
