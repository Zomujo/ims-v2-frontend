"use client";
import DashboardGeneral from "@features/dashboard/dashboardGeneral";
import DashboardSalesTend from "@features/dashboard/dashboardSalesTend";

const DashboardOverview = () => {
  return (
    <div className="overflow-scroll">
      <DashboardGeneral />
      <DashboardSalesTend />
    </div>
  );
};

export default DashboardOverview;
