"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // FIX(create-challenge): Log error for debugging
    console.error("CREATE-CHALLENGE: Admin error boundary caught error", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-bold text-brand-text">
          Something went wrong
        </h1>
        <p className="text-brand-muted">
          An error occurred while loading this admin page. This has been logged
          for investigation.
        </p>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="px-6 py-2 bg-brand-primary hover:bg-brand-primary600 text-white rounded-lg transition-colors"
          >
            Try again
          </button>

          <div className="text-sm">
            <button
              onClick={() => (window.location.href = "/admin")}
              className="text-brand-primary hover:underline"
            >
              Return to admin dashboard
            </button>
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="text-left text-sm text-brand-muted bg-brand-surface/50 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
