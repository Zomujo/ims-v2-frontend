"use client";
import { lazy, Suspense } from "react";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
const DashboardSellingItems = lazy(() => import("./dashboardSellingItems"));
const DashboardSalesTend = lazy(
  () => import("@features/dashboard/dashboardSalesTend"),
);
const DashboardDailySales = lazy(() => import("./dashboardDailySales"));
const DashboardSellingCategories = lazy(
  () => import("@features/dashboard/dashboardSellingCategories"),
);
const DashboardSalePaymentMethod = lazy(
  () => import("@features/dashboard/dashboardSalePaymentMethod"),
);
const DashboardSalesMarkup = lazy(
  () => import("@features/dashboard/dashboardSalesMarkup"),
);

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardSellingItems />
        <DashboardSalesTend />
        <DashboardSellingCategories />
        <DashboardDailySales />
        <DashboardSalePaymentMethod />
        <DashboardSalesMarkup />
      </Suspense>
    </div>
  );
};

export default DashboardOverview;
