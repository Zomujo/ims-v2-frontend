"use client";
import React, { useEffect, useState } from "react";
import {
  getExpirySettings,
  updateExpirySettings,
} from "../shared/actions/settings.actions";
import { toast } from "sonner";
import LoadingOverlay from "../ui/loadingOverlay";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";

const SettingsExpiry = () => {
  const [intervalQuantity, setIntervalQuantity] = useState<number | string>(0);
  const [intervalUnit, setIntervalUnit] = useState("days");
  const [loading, setLoading] = useState(false);
  const { isConnected } = useGlobalNotifications();
  const { data, loading: showLoadingLayer } = useFetchData({
    fetchFn: getExpirySettings,
    cacheKey: CacheKey.NotificationSettings,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpirySettings({
        intervalQuantity: Number(intervalQuantity),
        intervalUnit,
      });
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.data) {
      const { data: intervalData } = data;
      setIntervalQuantity(intervalData.intervalQuantity);
      setIntervalUnit(intervalData.intervalUnit);
    }
  }, [data]);

  return (
    <>
      {showLoadingLayer ? (
        <LoadingOverlay />
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <span className="text-indigo-500">🔒</span> Expiry Settings
          </h2>

          <p className="mb-10 max-w-2xl text-gray-500">
            Configure how expiry rules work across the platform. These settings
            determine time intervals you will be notified when your medical
            product or drug expires notifications.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            <div>
              <label
                htmlFor="intervalQuantity"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Interval Quantity
              </label>
              <input
                id="intervalQuantity"
                type="number"
                min={1}
                disabled={!isConnected}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none md:w-1/2 lg:w-1/3"
                value={intervalQuantity}
                onChange={(e) => setIntervalQuantity(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="intervalUnit"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Interval Unit
              </label>
              <select
                disabled={!isConnected}
                id="intervalUnit"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none md:w-1/2 lg:w-1/3"
                value={intervalUnit}
                onChange={(e) => setIntervalUnit(e.target.value)}
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isConnected || loading}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SettingsExpiry;
