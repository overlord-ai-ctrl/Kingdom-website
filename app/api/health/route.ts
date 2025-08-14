import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const status = {
    ok: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: "unknown" as string,
  };

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    status.database = "connected";
  } catch (error) {
    status.database = "disconnected";
    status.ok = false;
    console.error("Database connection failed:", error);
  }

  return NextResponse.json(status, {
    status: status.ok ? 200 : 503,
  });
}
