"use client";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
import DashboardSellingItems from "./dashboardSellingItems";
import DashboardSalesTend from "@features/dashboard/dashboardSalesTend";
import DashboardDailySales from "./dashboardDailySales";
import DashboardSellingCategories from "@features/dashboard/dashboardSellingCategories";
import DashboardSalePaymentMethod from "@features/dashboard/dashboardSalePaymentMethod";

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <DashboardSellingItems />
      <DashboardSalesTend />
      <DashboardSellingCategories />
      <DashboardDailySales />
      <DashboardSalePaymentMethod />
    </div>
  );
};

export default DashboardOverview;
