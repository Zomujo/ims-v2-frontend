"use client";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
import DashboardSellingItems from "./dashboardSellingItems";

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <DashboardSellingItems />
    </div>
  );
};

export default DashboardOverview;
