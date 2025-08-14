import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  userId?: string;
}

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as ExtendedSession;

  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <section className="section">
        <h2 className="h2">Your Profile</h2>
        <div className="mt-4 flex items-start space-x-6">
          {/* Left side - User info */}
          <div className="flex items-center space-x-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-lg font-medium text-brand-text">
                {session.user?.name}
              </p>
              <p className="text-brand-muted">{session.user?.email}</p>
              <p className="text-sm text-brand-muted">
                User ID: {session.userId || "N/A"}
              </p>
            </div>
          </div>

          {/* Right side - XP, Coins, Rank */}
          <div className="flex-1 ml-8 space-y-4">
            {/* Rank */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <span className="text-yellow-600 font-semibold">Rank</span>
                <span className="text-yellow-600 font-bold text-lg">#1</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">Top Contributor</p>
            </div>

            {/* XP Bar */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700 font-semibold">Experience</span>
                <span className="text-blue-700 font-bold">2,450 / 3,000</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Level 15 - 550 XP to next level
              </p>
            </div>

            {/* Coins Bar */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700 font-semibold">Coins</span>
                <span className="text-green-700 font-bold">1,247</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-green-700 text-sm mt-1">
                +23 today • 1,900 to next milestone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section">
        <h2 className="h2">Your Stats</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-primary/10 rounded-xl p-4 border border-brand-primary/20">
            <h3 className="font-semibold text-brand-primary">Rank</h3>
            <p className="text-2xl font-bold text-brand-text">#1</p>
            <p className="text-sm text-brand-muted">Top Contributor</p>
          </div>
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <h3 className="font-semibold text-green-400">Streak</h3>
            <p className="text-2xl font-bold text-brand-text">7</p>
            <p className="text-sm text-brand-muted">Days Active</p>
          </div>
          <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
            <h3 className="font-semibold text-purple-400">Challenges</h3>
            <p className="text-2xl font-bold text-brand-text">3</p>
            <p className="text-sm text-brand-muted">Completed</p>
          </div>
        </div>
      </section>

      {/* Open Challenges */}
      <section className="section">
        <h2 className="h2">Open Challenges</h2>
        <div className="mt-4 space-y-3">
          <div className="p-4 border border-neutral-700 rounded-xl bg-brand-surface/50">
            <h3 className="font-medium text-brand-text">
              AI Chatbot Challenge
            </h3>
            <p className="text-brand-muted text-sm mt-1">
              Build a Discord bot using AI
            </p>
            <div className="mt-3">
              <span className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-lg border border-yellow-500/30">
                In Progress
              </span>
            </div>
          </div>
          <div className="p-4 border border-neutral-700 rounded-xl bg-brand-surface/50">
            <h3 className="font-medium text-brand-text">Web App Challenge</h3>
            <p className="text-brand-muted text-sm mt-1">
              Create a full-stack application
            </p>
            <div className="mt-3">
              <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-lg border border-green-500/30">
                Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section">
        <h2 className="h2">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin"
            className="p-4 border border-neutral-700 rounded-xl hover:bg-brand-surface/50 transition-colors text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div className="font-medium text-brand-text">Admin Panel</div>
          </a>
          <Link
            href="/profile"
            className="p-4 border border-neutral-700 rounded-xl hover:bg-brand-surface/50 transition-colors text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              👤
            </div>
            <div className="font-medium text-brand-text">Profile</div>
          </Link>
          <a
            href="/challenges"
            className="p-4 border border-neutral-700 rounded-xl hover:bg-brand-surface/50 transition-colors text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <div className="font-medium text-brand-text">Challenges</div>
          </a>
          <a
            href="/leaderboard"
            className="p-4 border border-neutral-700 rounded-xl hover:bg-brand-surface/50 transition-colors text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              📊
            </div>
            <div className="font-medium text-brand-text">Leaderboard</div>
          </a>
        </div>
      </section>

      {/* Debug Info */}
      <section className="section">
        <h2 className="h2">Debug Info</h2>
        <div className="mt-3 text-brand-muted space-y-1">
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Time: {new Date().toISOString()}</p>
          <a href="/api/debug" className="text-brand-primary hover:underline">
            View Full Debug Info
          </a>
        </div>
      </section>
    </div>
  );
}
