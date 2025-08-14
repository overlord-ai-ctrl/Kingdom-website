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
    const payload = await req.json();
    const data = ChallengeInput.parse(payload);

    if (data.endAt <= data.startAt) {
      return NextResponse.json(
        { error: "endAt must be after startAt" },
        { status: 400 },
      );
    }

    const created = await prisma.challenge.create({
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

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
