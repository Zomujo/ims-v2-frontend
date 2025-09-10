"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";
import { PREFETCH_TARGETS } from "@/lib/cache/cache-warmer";
import { timeDifferenceChecker } from "@/lib/utils";

interface ProgressState {
  total: number;
  cached: number;
  percent: number;
}

interface CacheProgressContextType {
  dataProgress: ProgressState;
  isCaching: boolean;
  cachingMessage: string;
  startCaching: () => void;
}

const CacheProgressContext = createContext<
  CacheProgressContextType | undefined
>(undefined);

const initialProgressState = { total: 0, cached: 0, percent: 0 };

export function CacheProgressProvider({ children }: { children: ReactNode }) {
  const [dataProgress, setDataProgress] =
    useState<ProgressState>(initialProgressState);
  const [isCaching, setIsCaching] = useState(false);
  const [cachingMessage, setCachingMessage] = useState("");
  useOnlineStatus();

  const startCaching = useCallback(async () => {
    setIsCaching(true);
    setCachingMessage("Preparing to download data for offline use...");

    const lastCacheTime = await localforage.getItem<string>(
      CacheKey.LastCacheTime,
    );
    if (lastCacheTime && !timeDifferenceChecker(lastCacheTime, 72)) {
      setCachingMessage("Offline data is already up to date.");
      setTimeout(() => {
        setIsCaching(false);
      }, 2000);
      return;
    }

    console.log("Starting proactive data cache warming...");
    let cachedCount = 0;
    const totalToCache = PREFETCH_TARGETS.length;

    setDataProgress({ total: totalToCache, cached: 0, percent: 0 });

    for (const target of PREFETCH_TARGETS) {
      try {
        setCachingMessage(`Caching data for: ${target.key}`);
        const data = await target.fetcher();
        await localforage.setItem(target.key, data);
        console.log(`Successfully pre-cached data for: ${target.key}`);
        if (target.deepFetcher) {
          console.log("Fetching deep data for:", target.key);
          if (data && "rows" in data) {
            const rows = data.rows || [];
            for (const row of rows) {
              if ("id" in row && row.id) {
                setCachingMessage(
                  `Caching deep data for: ${target.key} - ${row.id}`,
                );
                const deepData = await target.deepFetcher(row.id);
                await localforage.setItem(
                  `${target.deepKey}-${row.id}`,
                  deepData,
                );
                console.log(
                  `Successfully pre-cached deep data for: ${target.deepKey}-${row.id}`,
                );
              }
            }
          }
        }
      } catch (error) {
        console.error(`Failed to pre-cache data for ${target.key}:`, error);
      } finally {
        cachedCount++;
        const percent = (cachedCount / totalToCache) * 100;
        setDataProgress({
          total: totalToCache,
          cached: cachedCount,
          percent,
        });
      }
    }
    await localforage.setItem(CacheKey.LastCacheTime, new Date().toISOString());
    console.log("Data cache warming complete.");
    setCachingMessage("Offline data caching complete!");
    setTimeout(() => {
      setIsCaching(false);
    }, 2000);
  }, []);

  return (
    <CacheProgressContext.Provider
      value={{
        dataProgress,
        isCaching,
        cachingMessage,
        startCaching,
      }}
    >
      {children}
    </CacheProgressContext.Provider>
  );
}

export const useCacheProgress = () => {
  const context = useContext(CacheProgressContext);
  if (context === undefined) {
    throw new Error(
      "useCacheProgress must be used within a CacheProgressProvider",
    );
  }
  return context;
};
