"use client";

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
import {
  getItemBatches,
  getItems,
  getItemsExpiry,
  getItemsNoPaginate,
} from "@features/shared/actions/items.actions";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { CACHE_PAGE_SIZE, CacheKey } from "@/lib/cache/cache-data";
import {
  getItemCategories,
  getItemCategoriesNoPaginate,
} from "@features/shared/actions/item-categories.actions";
import { getStockAdjustments } from "@features/shared/actions/stock-adjustments.actions";
import { getItemOrders } from "@features/shared/actions/item-orders.actions";
import {
  getSuppliers,
  getSuppliersNoPaginate,
} from "@features/shared/actions/supplier.actions";
import { getSales } from "@features/shared/actions/sales.actions";
import {
  getSalesItemsAction,
  getSalesPatientListAction,
} from "@features/shared/actions/sales.action";
import { UserRole } from "@features/shared/types/auth-action.types";
import {
  getDepartmentItemRequests,
  getDepartmentRequests,
} from "@features/shared/actions/department-request.actions";
import { getAuditLogs } from "@features/shared/actions/activity.actions";
import {
  getDepartmentsAction,
  getUsersAction,
} from "@features/shared/actions/settings.actions";
import { findSettings } from "@features/shared/actions/user.actions";

export const PREFETCH_TARGETS = [
  {
    key: CacheKey.DashboardSalePaymentMethod,
    fetcher: () => getSalePaymentMethod({ dateRange: "this_month" }),
  },
  {
    key: `${CacheKey.DashboardStockItems}_LOW`,
    fetcher: () =>
      getItems({
        status: "LOW",
        pageSize: "5",
      }),
  },
  {
    key: `${CacheKey.DashboardStockItems}_OUT_OF_STOCK`,
    fetcher: () =>
      getItems({
        status: "OUT_OF_STOCK",
        pageSize: "5",
      }),
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
    deepKey: CacheKey.ItemBatchesList,
    deepFetcher: getItemBatches,
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
    key: CacheKey.SuppliersNoPaginate,
    fetcher: () => getSuppliersNoPaginate(),
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
  {
    key: CacheKey.DepartmentManagementSettings,
    fetcher: () =>
      getDepartmentsAction({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.ManageUsersSettings,
    fetcher: () =>
      getUsersAction({
        pageSize: CACHE_PAGE_SIZE,
      }),
  },
  {
    key: CacheKey.NotificationSettings,
    fetcher: () => findSettings(),
  },
  {
    key: CacheKey.PatientsList,
    fetcher: () => getSalesPatientListAction(),
  },
  {
    key: CacheKey.ItemsCategoriesNoPaginate,
    fetcher: () => getItemCategoriesNoPaginate(),
  },
  {
    key: CacheKey.ItemsNoPaginate,
    fetcher: () => getItemsNoPaginate(),
  },
];

export function CacheWarmer() {
  return null;
}
