"use client";

import { useEffect } from "react";
import localforage from "localforage";
import { useGlobalNotifications } from "@/features/notifications/notifications-context";

import {
  getGeneralOverview,
  getLeastSellingItems,
  getSalePaymentMethod,
  getSalesTrend,
  getTopSellingItems,
} from "@features/shared/actions/dashboard.actions";
import { useCacheProgress } from "@/lib/cache/cache-progress-context";
import {
  getItems,
  getItemsExpiry,
} from "@features/shared/actions/items.actions";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";

const PREFETCH_TARGETS = [
  {
    key: "dashboard-sale-payment-method-this_month",
    fetcher: () => getSalePaymentMethod({ dateRange: "this_month" }),
  },
  {
    key: "dashboard-general",
    fetcher: () =>
      getGeneralOverview({
        startDate: (() => {
          const date = new Date();
          date.setMonth(date.getMonth() - 3);
          return date.toISOString();
        })(),
        endDate: new Date().toISOString(),
      }),
  },
  {
    key: "dashboard-stock-items",
    fetcher: () =>
      getItems({
        status: "LOW",
        pageSize: "5",
      }),
  },
  {
    key: "dashboard-expiring-items",
    fetcher: () =>
      getItemsExpiry({
        pageSize: "5",
        orderBy: "expiryDate",
        orderDirection: "ASC",
      }),
  },
  {
    key: "dashboard-top-selling-items",
    fetcher: () =>
      getTopSellingItems({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: "dashboard-least-selling-items",
    fetcher: () =>
      getLeastSellingItems({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: "dashboard-sales-trend",
    fetcher: () =>
      getSalesTrend({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: "items-list",
    fetcher: () =>
      getItems({
        pageSize: "100",
      }),
  },
];

export function CacheWarmer() {
  const { isConnected } = useGlobalNotifications();
  const { setDataProgress } = useCacheProgress();

  useEffect(() => {
    const prefetchAllData = async () => {
      if (!isConnected) return;

      console.log("Starting proactive data cache warming...");
      let cachedCount = 0;
      const totalToCache = PREFETCH_TARGETS.length;

      setDataProgress({ total: totalToCache, cached: 0, percent: 0 });

      for (const target of PREFETCH_TARGETS) {
        try {
          const cachedData = await localforage.getItem(target.key);
          if (!cachedData) {
            const data = await target.fetcher();
            await localforage.setItem(target.key, data);
            console.log(`Successfully pre-cached data for: ${target.key}`);
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

      console.log("Data cache warming complete.");
    };

    void prefetchAllData();
  }, [isConnected, setDataProgress]);

  return null;
}
