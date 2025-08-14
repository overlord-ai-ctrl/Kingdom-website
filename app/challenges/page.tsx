import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // ensure no stale cache

interface Challenge {
  id: string;
  type: string;
  title: string;
  brief: string;
  startAt: Date;
  endAt: Date;
  xp: number;
  crowns: number;
  difficulty: number;
  premiumOnly: boolean;
}

function byDate(a: Challenge, b: Challenge) {
  return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
}

function ChallengeCard({ c }: { c: Challenge }) {
  const now = new Date();
  const isActive = new Date(c.startAt) <= now && new Date(c.endAt) >= now;
  const isUpcoming = new Date(c.startAt) > now;
  const isPast = new Date(c.endAt) < now;

  let statusColor = "bg-gray-500/20 text-gray-400";
  let statusText = "Unknown";

  if (isActive) {
    statusColor = "bg-green-500/20 text-green-400";
    statusText = "Active";
  } else if (isUpcoming) {
    statusColor = "bg-blue-500/20 text-blue-400";
    statusText = "Upcoming";
  } else if (isPast) {
    statusColor = "bg-gray-500/20 text-gray-400";
    statusText = "Past";
  }

  return (
    <div className="p-4 border border-neutral-700 rounded-xl bg-brand-surface/50 hover:bg-brand-surface/70 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-brand-text">{c.title}</h3>
          <p className="text-sm text-brand-muted mt-1">{c.type}</p>
        </div>
        <span
          className={`inline-block text-xs px-2 py-1 rounded-lg border ${statusColor}`}
        >
          {statusText}
        </span>
      </div>

      <p className="text-sm text-brand-muted mb-3 line-clamp-2">{c.brief}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-blue-400">XP: {c.xp}</span>
          <span className="text-yellow-400">Crowns: {c.crowns}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-muted">Difficulty:</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < c.difficulty ? "bg-yellow-400" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-700 text-xs text-brand-muted">
        <div>Start: {new Date(c.startAt).toLocaleDateString()}</div>
        <div>End: {new Date(c.endAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export default async function ChallengesPage() {
  const now = new Date();
  const all = await prisma.challenge.findMany({
    orderBy: { startAt: "asc" },
  });

  const active = all
    .filter((c) => new Date(c.startAt) <= now && new Date(c.endAt) >= now)
    .sort(byDate);
  const upcoming = all.filter((c) => new Date(c.startAt) > now).sort(byDate);
  const past = all.filter((c) => new Date(c.endAt) < now).sort(byDate);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="h1">Challenges</h1>
        <p className="mt-2 text-brand-muted">
          Daily, weekly, and monthly challenges.
        </p>
      </section>

      {active.length > 0 && (
        <section className="space-y-3">
          <h2 className="h2">Active</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="h2">Upcoming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="h2">Past</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {past.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>
        </section>
      )}

      {all.length === 0 && (
        <section className="section text-center">
          <p className="text-brand-muted">No challenges available yet.</p>
        </section>
      )}
    </div>
  );
}
