"use client";

import { useCacheProgress } from "./cache-progress-context";
import { Progress } from "@features/ui/progress";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import { DownloadCloud } from "lucide-react";

export function GlobalCacheIndicator() {
  const { dataProgress, isCaching, cachingMessage } = useCacheProgress();
  const { isConnected } = useGlobalNotifications();

  if (!isConnected || !isCaching) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md rounded-lg p-8 text-center shadow-2xl">
        <DownloadCloud className="text-primary mx-auto h-16 w-16 animate-bounce" />
        <h2 className="mt-4 text-2xl font-bold">Downloading for Offline Use</h2>
        <p className="text-muted-foreground mt-2">{cachingMessage}</p>
        <div className="mt-6">
          <Progress value={dataProgress.percent} className="w-full" />
          <p className="text-muted-foreground mt-2 text-right text-sm">
            {Math.round(dataProgress.percent)}%
          </p>
        </div>
      </div>
    </div>
  );
}
