"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewChallengePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      type: String(fd.get("type") || "WEEKLY").toUpperCase(),
      title: String(fd.get("title") || ""),
      brief: String(fd.get("brief") || ""),
      startAt: String(fd.get("startAt") || ""),
      endAt: String(fd.get("endAt") || ""),
      xp: Number(fd.get("xp") || 0),
      crowns: Number(fd.get("crowns") || 0),
      difficulty: Number(fd.get("difficulty") || 2),
      premiumOnly: fd.get("premiumOnly") === "on",
    };

    try {
      const res = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to create");
      // success: go to challenges
      router.push("/challenges");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="section">
        <h1 className="h1">Create New Challenge</h1>
        <p className="mt-2 text-brand-muted">
          Design and launch a new challenge for the community
        </p>
      </section>

      <section className="section">
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                Challenge Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY" selected>
                  Weekly
                </option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                Difficulty (1-5)
              </label>
              <input
                type="number"
                id="difficulty"
                name="difficulty"
                min="1"
                max="5"
                defaultValue="2"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-brand-text mb-2"
            >
              Challenge Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              minLength={3}
              maxLength={120}
              placeholder="Enter challenge title..."
              className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
            />
          </div>

          <div>
            <label
              htmlFor="brief"
              className="block text-sm font-medium text-brand-text mb-2"
            >
              Challenge Description
            </label>
            <textarea
              id="brief"
              name="brief"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
              placeholder="Describe the challenge requirements, goals, and evaluation criteria..."
              className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring resize-vertical"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startAt"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                id="startAt"
                name="startAt"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              />
            </div>

            <div>
              <label
                htmlFor="endAt"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                End Date & Time
              </label>
              <input
                type="datetime-local"
                id="endAt"
                name="endAt"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="xp"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                XP Reward
              </label>
              <input
                type="number"
                id="xp"
                name="xp"
                min="0"
                defaultValue="100"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              />
            </div>

            <div>
              <label
                htmlFor="crowns"
                className="block text-sm font-medium text-brand-text mb-2"
              >
                Crowns Reward
              </label>
              <input
                type="number"
                id="crowns"
                name="crowns"
                min="0"
                defaultValue="10"
                required
                className="w-full px-3 py-2 bg-brand-surface border border-neutral-700 rounded-lg text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-ring"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="premiumOnly"
              name="premiumOnly"
              className="w-4 h-4 text-brand-primary bg-brand-surface border-neutral-700 rounded focus:ring-brand-ring"
            />
            <label htmlFor="premiumOnly" className="text-sm text-brand-text">
              Premium members only
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-brand-primary hover:bg-brand-primary600 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              {submitting ? "Creating..." : "Create Challenge"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-brand-surface hover:bg-neutral-800 text-brand-text rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
