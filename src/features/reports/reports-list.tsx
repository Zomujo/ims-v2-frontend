"use client";
import { ScrollArea } from "../ui/scroll-area";
import { ReportAccordion } from "./report-accordion";
import { ReportId } from "@features/reports/reports.data";

export default function ReportsList() {
  const inventoryReportData = [
    {
      id: ReportId.StockLevelReport,
      name: "Stock Level Report",
      quantity: "",
    },

    {
      id: ReportId.StockMovementReport,
      name: "Expiry report",
      quantity: "",
    },
  ];

  const salesReportData = [
    {
      id: ReportId.EarningsOverviewReport,
      name: "Sales Level Report",
      quantity: "",
    },
  ];

  return (
    <ScrollArea className="mt-2 h-[calc(100%_-_5rem)] rounded-2xl bg-white pr-4">
      <ReportHeader
        title="REPORT NAME (Batch number)"
        option="Type"
        variant=""
      />

      <ReportAccordion
        title="INVENTORY  REPORT"
        type="Inventory Report"
        reportReference={inventoryReportData}
      />

      <ReportAccordion
        title="SALES REPORT"
        type="Sales"
        reportReference={salesReportData}
      />
    </ScrollArea>
  );
}

type ReportHeaderProps = {
  title: string;
  option: string;
  variant: string;
};

const ReportHeader = ({ title, option, variant }: ReportHeaderProps) => (
  <div className="mt-[26px] flex w-full gap-5 rounded-xl border border-gray-200 bg-[#FAFAFA] px-3.5 py-[12.5px] text-sm font-medium text-gray-500">
    <div className="w-[35%]">
      <p>{title}</p>
    </div>
    <div className="w-[35%]">
      <p>{option}</p>
    </div>
    <div>
      <p>{variant}</p>
    </div>
  </div>
);
