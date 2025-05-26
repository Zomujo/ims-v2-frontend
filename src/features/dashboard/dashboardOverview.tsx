"use client";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
import DashboardSellingItems from "./dashboardSellingItems";
import DashboardSalesTend from "@features/dashboard/dashboardSalesTend";
import DashboardDailySales from "./dashboardDailySales";
import DashboardSellingCategories from "@features/dashboard/dashboardSellingCategories";

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <DashboardSellingItems />
      <DashboardSalesTend />
      <DashboardSellingCategories />
      <DashboardDailySales />
    </div>
  );
};

export default DashboardOverview;
