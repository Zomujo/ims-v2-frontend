"use client";
import React, { useEffect, useState } from "react";
import {
  getExpirySettings,
  updateExpirySettings,
} from "../shared/actions/settings.actions";
import { toast } from "sonner";
import LoadingOverlay from "../ui/loadingOverlay";

const SettingsExpiry = () => {
  const [intervalQuantity, setIntervalQuantity] = useState<number | string>(0);
  const [intervalUnit, setIntervalUnit] = useState("days");
  const [loading, setLoading] = useState(false);
  const [showLoadingLayer, setShowLoadingLayer] = useState(false);

  const fetchSettingsExpiry = async () => {
    setShowLoadingLayer(true);
    try {
      const response = await getExpirySettings();

      const { data } = response;
      console.log(data);

      if (data) {
        setIntervalQuantity(data.intervalQuantity);
        setIntervalUnit(data.intervalUnit);
      }
    } catch (err) {
      toast.error("Failed to fetch settings");
    } finally {
      setShowLoadingLayer(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpirySettings({
        intervalQuantity: Number(intervalQuantity),
        intervalUnit,
      });
      toast.success("Settings updated successfully!");
    } catch (err) {
      toast.error("Failed to update settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsExpiry();
  }, []);

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
            determine time intervals used for automatic cleanup, archiving, or
            notifications.
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
                disabled={loading}
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
