import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">The Network</h1>
      <p className="text-center text-lg max-w-2xl">
        Challenge-first, role-gated AI/dev community. Join daily, weekly, and
        monthly challenges. Level up with XP and crowns.
      </p>
      <div className="flex gap-4">
        <Link
          href="/api/auth/signin"
          className="rounded-md bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          Join with Discord
        </Link>
        <Link
          href="/challenges"
          className="rounded-md border px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Browse Challenges
        </Link>
      </div>
      <div className="mt-8 text-sm text-gray-500">
        <Link href="/api/health" className="hover:underline">
          Health Check
        </Link>
      </div>
    </main>
  );
}
