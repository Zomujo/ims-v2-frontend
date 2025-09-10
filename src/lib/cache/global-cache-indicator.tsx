"use client";

import { useCacheProgress } from "./cache-progress-context";
import { Progress } from "@features/ui/progress";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import { DownloadCloud } from "lucide-react";
import { useEffect, useState } from "react";

export function GlobalCacheIndicator() {
  const { dataProgress, isCaching, cachingMessage } = useCacheProgress();
  const { isConnected } = useGlobalNotifications();
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalizingProgress, setFinalizingProgress] = useState(0);

  const isDataCachingDone = dataProgress.percent >= 100;

  useEffect(() => {
    if (isDataCachingDone && isCaching) {
      setIsFinalizing(true);
    }
  }, [isDataCachingDone, isCaching]);

  useEffect(() => {
    if (isFinalizing) {
      const duration = 3 * 60 * 1000; // 3 minutes
      const interval = 100;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const customProgress = (currentStep / steps) * 100;
        setFinalizingProgress(customProgress);
        if (customProgress >= 100) {
          clearInterval(timer);
          setIsFinalizing(false); // Hide component when finalizing is done
        }
      }, interval);

      return () => clearInterval(timer);
    } else {
      setFinalizingProgress(0);
    }
  }, [isFinalizing]);

  if (!isConnected || (!isCaching && !isFinalizing)) {
    return null;
  }

  const progress = isFinalizing ? finalizingProgress : dataProgress.percent;
  const title = isFinalizing
    ? "Finalizing Offline Data"
    : "Downloading for Offline Use";
  const message = isFinalizing
    ? "Preparing pages for offline access. This will take a few minutes..."
    : cachingMessage;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-lg p-8 text-center shadow-2xl">
        <DownloadCloud className="text-primary mx-auto h-16 w-16 animate-bounce" />
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">{message}</p>
        <div className="mt-6">
          <Progress value={progress} className="w-full" />
          <p className="text-muted-foreground mt-2 text-right text-sm">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
