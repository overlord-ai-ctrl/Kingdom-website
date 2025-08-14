"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-600 max-w-md text-center">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
      >
        Try again
      </button>
      <div className="mt-4 text-sm text-gray-500">
        <a href="/api/health" className="hover:underline">
          Check system status
        </a>
      </div>
    </div>
  );
}
