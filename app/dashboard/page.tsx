import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to The Network
        </h1>
        <p className="text-gray-600 mt-2">
          Your exclusive AI/dev community dashboard
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
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
            <p className="text-lg font-medium">{session.user?.name}</p>
            <p className="text-gray-600">{session.user?.email}</p>
            <p className="text-sm text-gray-500">User ID: {session.userId}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900">Rank</h3>
          <p className="text-2xl font-bold text-blue-600">#1</p>
          <p className="text-sm text-blue-700">Top Contributor</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-900">Streak</h3>
          <p className="text-2xl font-bold text-green-600">7</p>
          <p className="text-sm text-green-700">Days Active</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900">Challenges</h3>
          <p className="text-2xl font-bold text-purple-600">3</p>
          <p className="text-sm text-purple-700">Completed</p>
        </div>
      </div>

      {/* Open Challenges */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Open Challenges</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">AI Chatbot Challenge</h3>
            <p className="text-gray-600 text-sm">
              Build a Discord bot using AI
            </p>
            <div className="mt-2">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                In Progress
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Web App Challenge</h3>
            <p className="text-gray-600 text-sm">
              Create a full-stack application
            </p>
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium">Admin Panel</div>
          </a>
          <Link
            href="/profile"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium">Profile</div>
          </Link>
          <a
            href="/challenges"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-medium">Challenges</div>
          </a>
          <a
            href="/leaderboard"
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">Leaderboard</div>
          </a>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-medium mb-2">Debug Info:</h2>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>Time: {new Date().toISOString()}</p>
        <a href="/api/debug" className="text-blue-500 hover:underline">
          View Full Debug Info
        </a>
      </div>
    </div>
  );
}
