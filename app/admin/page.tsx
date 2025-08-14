import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Overlord Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage challenges, users, and system settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Challenges Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Challenges</h2>
            <div className="space-y-3">
              <Link
                href="/admin/challenges"
                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                View All Challenges
              </Link>
              <Link
                href="/admin/challenges/new"
                className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
              >
                Create New Challenge
              </Link>
              <Link
                href="/admin/challenges/reviews"
                className="block w-full text-left px-4 py-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors"
              >
                Review Submissions
              </Link>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                View All Users
              </Link>
              <Link
                href="/admin/users/roles"
                className="block w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
              >
                Manage Roles
              </Link>
              <Link
                href="/admin/users/premium"
                className="block w-full text-left px-4 py-2 bg-gold-50 text-gold-700 rounded hover:bg-gold-100 transition-colors"
              >
                Premium Users
              </Link>
            </div>
          </div>

          {/* System Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">System</h2>
            <div className="space-y-3">
              <Link
                href="/admin/system/health"
                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                System Health
              </Link>
              <Link
                href="/admin/system/logs"
                className="block w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                View Logs
              </Link>
              <Link
                href="/admin/system/settings"
                className="block w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <div className="space-y-3">
              <Link
                href="/admin/analytics/overview"
                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/admin/analytics/challenges"
                className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
              >
                Challenge Stats
              </Link>
              <Link
                href="/admin/analytics/users"
                className="block w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
              >
                User Activity
              </Link>
            </div>
          </div>

          {/* Discord Integration */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Discord</h2>
            <div className="space-y-3">
              <Link
                href="/admin/discord/sync"
                className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
              >
                Sync Roles
              </Link>
              <Link
                href="/admin/discord/announcements"
                className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
              >
                Send Announcement
              </Link>
              <Link
                href="/admin/discord/settings"
                className="block w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                Bot Settings
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="block w-full text-left px-4 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors">
                Emergency Broadcast
              </button>
              <button className="block w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 transition-colors">
                Backup Database
              </button>
              <button className="block w-full text-left px-4 py-2 bg-teal-50 text-teal-700 rounded hover:bg-teal-100 transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600">Database</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600">Discord Bot</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">⚠️</div>
              <div className="text-sm text-gray-600">Redis Queue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✅</div>
              <div className="text-sm text-gray-600">API Health</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
