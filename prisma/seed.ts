import {
  PrismaClient,
  Role,
  ChallengeType,
  SubmissionStatus,
} from "@prisma/client";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Seed badges
  const builderBadge = await prisma.badge.upsert({
    where: { code: "BUILDER_I" },
    update: {},
    create: { code: "BUILDER_I", name: "Builder I", criteriaJSON: { xp: 100 } },
  });

  // Create sample challenges
  const now = new Date();
  const challenges = await Promise.all([
    prisma.challenge.create({
      data: {
        type: ChallengeType.DAILY,
        title: "Daily: Ship a micro-utility",
        brief: "Build a small CLI or snippet solving a daily problem.",
        rubricJSON: {
          criteria: ["Functionality", "Code quality", "Docs"],
          max: 100,
        },
        startAt: now,
        endAt: addDays(now, 1),
        xp: 20,
        crowns: 1,
        difficulty: 2,
      },
    }),
    prisma.challenge.create({
      data: {
        type: ChallengeType.WEEKLY,
        title: "Weekly: Build a dashboard",
        brief: "Team up to build a data dashboard.",
        rubricJSON: {
          criteria: ["Design", "Performance", "Accessibility"],
          max: 100,
        },
        startAt: now,
        endAt: addDays(now, 7),
        xp: 100,
        crowns: 5,
        difficulty: 3,
      },
    }),
    prisma.challenge.create({
      data: {
        type: ChallengeType.MONTHLY,
        title: "Monthly: Launch a product",
        brief: "Plan, build, and launch a micro-product.",
        rubricJSON: {
          criteria: ["Impact", "Execution", "Originality"],
          max: 100,
        },
        startAt: now,
        endAt: addDays(now, 30),
        xp: 400,
        crowns: 20,
        difficulty: 4,
        premiumOnly: false,
      },
    }),
  ]);

  // Create demo users across roles
  const roles: Role[] = [
    Role.PEASANT,
    Role.SQUIRE,
    Role.KNIGHT,
    Role.BARON,
    Role.VISCOUNT,
    Role.EARL,
    Role.NOBLE,
    Role.KING,
  ];

  for (const [index, role] of roles.entries()) {
    const user = await prisma.user.upsert({
      where: { discordId: `demo_${role}` },
      update: {},
      create: {
        discordId: `demo_${role}`,
        username: `${role.toLowerCase()}_demo`,
        email: `${role.toLowerCase()}@example.com`,
        avatar: null,
        premium: index >= 4,
      },
    });
    await prisma.userRole.create({
      data: { userId: user.id, role, source: "SYSTEM" },
    });
  }

  const overlord = await prisma.user.upsert({
    where: { discordId: "demo_overlord" },
    update: {},
    create: {
      discordId: "demo_overlord",
      username: "overlord",
      email: "overlord@example.com",
      premium: true,
    },
  });
  await prisma.userRole.create({
    data: { userId: overlord.id, role: Role.OVERLORD, source: "SYSTEM" },
  });

  // Create sample submissions
  const sampleUser = await prisma.user.findFirstOrThrow({
    where: { discordId: "demo_peasant" },
  });
  await prisma.submission.create({
    data: {
      challengeId: challenges[0].id,
      userId: sampleUser.id,
      repoUrl: "https://github.com/example/repo",
      liveUrl: "https://example.com",
      notes: "My first submission",
      status: SubmissionStatus.SUBMITTED,
    },
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
