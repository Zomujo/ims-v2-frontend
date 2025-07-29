"use client";

import { useCacheProgress } from "./cache-progress-context";
import { Progress } from "@features/ui/progress";
import { useEffect, useState } from "react";
import { useGlobalNotifications } from "@features/notifications/notifications-context";

export function GlobalCacheIndicator() {
  const { dataProgress } = useCacheProgress();
  const { isConnected } = useGlobalNotifications();
  const [isComplete, setIsComplete] = useState(false);
  const [assetCustomTracker, setAssetCustomTracker] = useState(0);

  const isDataCachingDone = dataProgress.percent >= 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAssetCustomTracker((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 1;
        if (next >= 100) {
          setIsComplete(true);
          clearInterval(intervalId);
        }
        return next >= 100 ? 100 : next;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isConnected || (isComplete && isDataCachingDone)) {
    return null;
  }

  return (
    <div className="bg-card animate-in fade-in-90 fixed right-4 bottom-4 z-50 w-72 rounded-lg border p-4 shadow-lg">
      {!isComplete && (
        <div>
          <p className="mb-1 text-sm font-medium">
            Preparing app for offline use...
          </p>
          <Progress value={assetCustomTracker} className="w-full" />
          <p className="text-muted-foreground mt-1 text-right text-xs">
            {Math.round(assetCustomTracker)}%
          </p>
        </div>
      )}
      {!isDataCachingDone && (
        <div className={!isComplete ? "mt-3" : ""}>
          <p className="mb-1 text-sm font-medium">Caching initial data...</p>
          <Progress value={dataProgress.percent} className="w-full" />
          <p className="text-muted-foreground mt-1 text-right text-xs">
            {Math.round(dataProgress.percent)}%
          </p>
        </div>
      )}
    </div>
  );
}
