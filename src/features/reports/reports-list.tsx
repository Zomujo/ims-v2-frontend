"use client";
import { getSalesReport } from "../shared/actions/report.actions";
import useFetchData from "../shared/hooks/use-fetch-data";
import { ScrollArea } from "../ui/scroll-area";
import { ReportAccordion } from "./report-accordion";

export default function ReportsList() {
  const { data } = useFetchData({ fetchFn: getSalesReport });
  const itemCategories = data?.data.rows ?? [];

  const saleNameId = itemCategories.flatMap(({ saleItems }) =>
    saleItems.map(({ batchId, item: { name } }) => ({
      id: batchId,
      name,
    })),
  );
  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <div className="mt-[26px] flex w-full gap-5 rounded-xl border-1 border-gray-200 bg-[#FAFAFA] px-3.5 py-[12.5px] text-[14px] font-medium text-gray-500">
        <div className="w-[35%]">
          <p>REPORT NAME</p>
        </div>
        <p>TYPE</p>
      </div>
      <ReportAccordion
        title="SALES AND FINANCIAL REPORTS"
        type="Sales and Financial Reports"
        reportReference={saleNameId}
      />
    </ScrollArea>
  );
}
