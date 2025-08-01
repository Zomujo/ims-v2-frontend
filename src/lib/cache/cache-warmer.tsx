"use client";

import { useEffect } from "react";
import localforage from "localforage";
import { useGlobalNotifications } from "@/features/notifications/notifications-context";

import {
  getDailySales,
  getGeneralOverview,
  getLeastSellingItems,
  getSaleInsuranceMarkup,
  getSalePaymentMethod,
  getSalesTrend,
  getSellingCategories,
  getTopSellingItems,
} from "@features/shared/actions/dashboard.actions";
import { useCacheProgress } from "@/lib/cache/cache-progress-context";
import {
  getItems,
  getItemsExpiry,
} from "@features/shared/actions/items.actions";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { CACHE_PAGE_SIZE, CacheKey } from "@/lib/cache/cache-data";
import { getItemCategories } from "@features/shared/actions/item-categories.actions";
import { getStockAdjustments } from "@features/shared/actions/stock-adjustments.actions";
import { getItemOrders } from "@features/shared/actions/item-orders.actions";
import { getSuppliers } from "@features/shared/actions/supplier.actions";
import { getSales } from "@features/shared/actions/sales.actions";
import { getSalesItemsAction } from "@features/shared/actions/sales.action";
import { UserRole } from "@features/shared/types/auth-action.types";
import {
  getDepartmentItemRequests,
  getDepartmentRequests,
} from "@features/shared/actions/department-request.actions";
import { getAuditLogs } from "@features/shared/actions/activity.actions";

const PREFETCH_TARGETS = [
  {
    key: CacheKey.DashboardSalePaymentMethod,
    fetcher: () => getSalePaymentMethod({ dateRange: "this_month" }),
  },
  {
    key: CacheKey.DashboardGeneral,
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
    key: CacheKey.DashboardStockItems,
    fetcher: () =>
      getItems({
        status: "LOW",
        pageSize: "5",
      }),
  },
  {
    key: CacheKey.DashboardExpiringItems,
    fetcher: () =>
      getItemsExpiry({
        pageSize: "5",
        orderBy: "expiryDate",
        orderDirection: "ASC",
      }),
  },
  {
    key: CacheKey.DashboardTopSellingItems,
    fetcher: () =>
      getTopSellingItems({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: CacheKey.DashboardLeastSellingItems,
    fetcher: () =>
      getLeastSellingItems({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: CacheKey.DashboardSalesTrend,
    fetcher: () =>
      getSalesTrend({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: CacheKey.DashboardSellingCategories,
    fetcher: () =>
      getSellingCategories({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: CacheKey.DashboardDailySales,
    fetcher: () =>
      getDailySales({
        startDate: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date.toISOString();
        })(),
        endDate: new Date().toISOString(),
      }),
  },
  {
    key: CacheKey.DashboardSalesMarkup,
    fetcher: () =>
      getSaleInsuranceMarkup({
        dateRange: DATE_RANGE.THIS_MONTH,
      }),
  },
  {
    key: CacheKey.ItemsList,
    fetcher: () =>
      getItems({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.CategoriesList,
    fetcher: () =>
      getItemCategories({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.StockAdjustmentList,
    fetcher: () =>
      getStockAdjustments({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.ExpiryItemList,
    fetcher: () =>
      getItemsExpiry({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.ItemOrdersList,
    fetcher: () =>
      getItemOrders({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.SuppliersList,
    fetcher: () =>
      getSuppliers({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.SalesList,
    fetcher: () =>
      getSales({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.SalesItemList,
    fetcher: () =>
      getSalesItemsAction({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: `${CacheKey.DepartmentRequestList}-${UserRole.CentralAdmin}`,
    fetcher: () =>
      getDepartmentRequests({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: `${CacheKey.DepartmentRequestList}-${UserRole.DepartmentAdmin}`,
    fetcher: () =>
      getDepartmentItemRequests({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: `${CacheKey.DepartmentRequestList}-${UserRole.Pharmacist}`,
    fetcher: () =>
      getDepartmentItemRequests({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.AuditLogsList,
    fetcher: () =>
      getAuditLogs({
        pageSize: CACHE_PAGE_SIZE,
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
