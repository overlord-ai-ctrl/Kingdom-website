import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ChallengeInput = z.object({
  type: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
  title: z.string().min(3).max(120),
  brief: z.string().min(10).max(5000),
  startAt: z.string().transform((v) => new Date(v)),
  endAt: z.string().transform((v) => new Date(v)),
  xp: z.coerce.number().int().min(0),
  crowns: z.coerce.number().int().min(0),
  difficulty: z.coerce.number().int().min(1).max(5),
  premiumOnly: z.coerce.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    // FIX(create-challenge): Add diagnostic logging
    console.log("CREATE-CHALLENGE: API route called");

    // FIX(create-challenge): Robust JSON parsing with error handling
    let payload: unknown;
    try {
      payload = await req.json();
      console.log("CREATE-CHALLENGE: Received payload", payload);
    } catch (parseError) {
      console.error("CREATE-CHALLENGE: JSON parse error", parseError);
      return NextResponse.json(
        { error: "INVALID_JSON", details: "Failed to parse request body" },
        { status: 400 },
      );
    }

    // FIX(create-challenge): Validate payload with detailed error messages
    let data;
    try {
      data = ChallengeInput.parse(payload);
      console.log("CREATE-CHALLENGE: Validated data", data);
    } catch (validationError) {
      console.error("CREATE-CHALLENGE: Validation error", validationError);
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: "VALIDATION_FAILED",
            details: validationError.issues.map(
              (e) => `${e.path.join(".")}: ${e.message}`,
            ),
          },
          { status: 400 },
        );
      }
      return NextResponse.json(
        { error: "VALIDATION_FAILED", details: "Invalid challenge data" },
        { status: 400 },
      );
    }

    // FIX(create-challenge): Additional date validation
    if (data.endAt <= data.startAt) {
      console.error("CREATE-CHALLENGE: Date validation failed", {
        startAt: data.startAt,
        endAt: data.endAt,
      });
      return NextResponse.json(
        { error: "INVALID_DATES", details: "endAt must be after startAt" },
        { status: 400 },
      );
    }

    // FIX(create-challenge): Database operation with detailed error handling
    let created;
    try {
      created = await prisma.challenge.create({
        data: {
          type: data.type,
          title: data.title,
          brief: data.brief,
          rubricJSON: {}, // placeholder; editable later
          startAt: data.startAt,
          endAt: data.endAt,
          xp: data.xp,
          crowns: data.crowns,
          difficulty: data.difficulty,
          premiumOnly: data.premiumOnly ?? false,
        },
        select: { id: true },
      });
      console.log("CREATE-CHALLENGE: Challenge created successfully", created);
    } catch (dbError) {
      console.error("CREATE-CHALLENGE: Database error", dbError);

      // FIX(create-challenge): Handle specific Prisma errors
      if (dbError instanceof Error) {
        if (dbError.message.includes("Unique constraint")) {
          return NextResponse.json(
            {
              error: "DUPLICATE_CHALLENGE",
              details: "A challenge with this title already exists",
            },
            { status: 409 },
          );
        }
        if (dbError.message.includes("Foreign key constraint")) {
          return NextResponse.json(
            {
              error: "INVALID_REFERENCE",
              details: "Invalid reference in challenge data",
            },
            { status: 400 },
          );
        }
      }

      return NextResponse.json(
        {
          error: "DATABASE_ERROR",
          details: "Failed to create challenge in database",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (err: unknown) {
    // FIX(create-challenge): Comprehensive error handling
    console.error("CREATE-CHALLENGE: Unexpected error", err);

    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { error: "SERVER_ERROR", details: errorMessage },
      { status: 500 },
    );
  }
}
