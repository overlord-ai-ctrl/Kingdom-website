export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Your rank, streak, and open challenges will appear here.
      </p>
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h2 className="font-medium">Debug Info:</h2>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>Time: {new Date().toISOString()}</p>
        <a href="/api/debug" className="text-blue-500 hover:underline">
          View Debug Info
        </a>
      </div>
    </div>
  );
}
