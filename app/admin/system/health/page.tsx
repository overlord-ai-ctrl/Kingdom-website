"use client";

import { useEffect, useState } from "react";

interface HealthData {
  ok: boolean;
  timestamp: string;
  environment: string;
  database: string;
}

export default function SystemHealthPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHealthData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch health data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-2">
            Current system status and diagnostics
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {healthData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Status:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${healthData.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {healthData.ok ? "Healthy" : "Unhealthy"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Environment:</span>
                <span className="text-gray-600">{healthData.environment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Database:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${healthData.database === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {healthData.database}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Last Check:</span>
                <span className="text-gray-600">
                  {new Date(healthData.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-red-600">Failed to load health data</p>
          )}
        </div>
      </div>
    </div>
  );
}
