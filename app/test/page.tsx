import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Test Page Working!
      </h1>
      <p className="text-lg">
        If you can see this, the app is deployed correctly.
      </p>
      <div className="text-sm text-gray-500">
        <p>Build time: {new Date().toISOString()}</p>
        <p>Environment: {process.env.NODE_ENV}</p>
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
