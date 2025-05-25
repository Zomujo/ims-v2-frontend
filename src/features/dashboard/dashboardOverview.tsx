"use client";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
import DashboardSellingItems from "./dashboardSellingItems";
import DashboardSalesTend from "@features/dashboard/dashboardSalesTend";

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <DashboardSellingItems />
      <DashboardSalesTend />
    </div>
  );
};

export default DashboardOverview;
