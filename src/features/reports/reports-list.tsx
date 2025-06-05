"use client";
import { useEffect, useState } from "react";
import {
  getReportData,
  getSalesReport,
} from "../shared/actions/report.actions";
import useFetchData from "../shared/hooks/use-fetch-data";
import { ScrollArea } from "../ui/scroll-area";
import { ReportAccordion } from "./report-accordion";
import {
  ReportInfoDto,
  ExpiryReportDto,
  CountExpiryInfo,
} from "../shared/types/action.types";

type ReportInfo = {
  id: string;
  name: string;
  quantity?: string;
};

export default function ReportsList() {
  const { data } = useFetchData({ fetchFn: getSalesReport });

  const [reportSections, setReportSections] = useState<{
    approaching: ReportInfo[];
    critical: ReportInfo[];
    highRisk: ReportInfo[];
    expired: ReportInfo[];
    stockLevelReport: ReportInfo[];
  }>({
    approaching: [],
    critical: [],
    highRisk: [],
    expired: [],
    stockLevelReport: [],
  });

  const saleNameId =
    data?.data.rows.flatMap(({ saleItems }) =>
      saleItems.map(({ batchId, batchNumber, quantity, item: { name } }) => ({
        id: batchId,
        name: `${name} (${batchNumber})`,
        quantity,
      })),
    ) ?? [];

  useEffect(() => {
    const fetchExpiryReport = async () => {
      const { data: expiryReportData } = await getReportData("expiry_report");
      const { approaching, critical, highRisk, expired } =
        expiryReportData?.rows as unknown as ExpiryReportDto;

      setReportSections((prev) => ({
        ...prev,
        approaching: mapToReportInfo(approaching.rows),
        critical: mapToReportInfo(critical.rows),
        highRisk: mapToReportInfo(highRisk.rows),
        expired: mapToReportInfo(expired.rows),
      }));
    };

    void fetchExpiryReport();
  }, []);

  useEffect(() => {
    const fetchStockLevelReport = async () => {
      const { data: stockLevelReportData } =
        await getReportData("stock_level_report");

      const { rows } = stockLevelReportData as unknown as CountExpiryInfo;
      if (rows) {
        setReportSections((prev) => ({
          ...prev,
          stockLevelReport: mapToReportInfo(rows),
        }));
      }
    };

    void fetchStockLevelReport();
  }, []);

  function mapToReportInfo(items: ReportInfoDto[]): ReportInfo[] {
    return items.map(({ batchNumber, item: { id, name }, validity }) => ({
      id,
      name: `${name} (${batchNumber})`,
      quantity: validity.split("T")[0],
    }));
  }
  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <ReportHeader
        title="REPORT NAME (Batch number)"
        option="Type"
        variant="Quantity"
      />
      <ReportAccordion
        title="SALES AND FINANCIAL REPORTS"
        type="Sales and Financial Reports"
        reportReference={saleNameId}
      />
      <ReportAccordion
        title="STOCK LEVEL REPORT"
        type="Stock Level Reports"
        reportReference={reportSections.stockLevelReport}
      />

      <ReportHeader
        title="EXPIRY NAME (Batch number)"
        option="Expiry Type"
        variant="Validity"
      />
      <ReportAccordion
        title="EXPIRY APPROACHING"
        type="Approaching"
        reportReference={reportSections.approaching}
      />
      <ReportAccordion
        title="EXPIRY HIGH RISK"
        type="High Risk"
        reportReference={reportSections.highRisk}
      />
      <ReportAccordion
        title="EXPIRY CRITICAL"
        type="Critical"
        reportReference={reportSections.critical}
      />
      <ReportAccordion
        title="EXPIRED"
        type="Expired"
        reportReference={reportSections.expired}
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
