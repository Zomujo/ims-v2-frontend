"use client";
import { use, useEffect, useState } from "react";
import {
  getCategorizedReport,
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
  GetSaleDto,
  PeriodicSalesDto,
  TopSellingDto,
} from "../shared/types/action.types";
import { cn } from "@/lib/utils";

type ReportInfo = {
  id: string;
  name: string;
  quantity?: string | number;
  total?: string | number;
};

export default function ReportsList() {
  const { data, loading: financeLoading } = useFetchData({
    fetchFn: getSalesReport,
  });

  console.log(data);
  const [periodicSales, setPeriodicSales] = useState<ReportInfo[]>([]);
  const [topSelling, setTopSelling] = useState<ReportInfo[]>([]);
  const [loading, setLoading] = useState({
    expiry: false,
    topSales: false,
    periodicSales: false,
    stockLevel: false,
  });
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
    setLoading((prev) => ({
      ...prev,
      expiry: true,
    }));
    const fetchExpiryReport = async () => {
      const { data: expiryReportData } = await getCategorizedReport(
        "items",
        "expiry",
      );
      const { approaching, critical, highRisk, expired } =
        expiryReportData?.rows as unknown as ExpiryReportDto;

      setReportSections((prev) => ({
        ...prev,
        approaching: mapToReportInfo(approaching.rows),
        critical: mapToReportInfo(critical.rows),
        highRisk: mapToReportInfo(highRisk.rows),
        expired: mapToReportInfo(expired.rows),
      }));

      setLoading((prev) => ({
        ...prev,
        expiry: false,
      }));
    };

    void fetchExpiryReport();
  }, []);

  useEffect(() => {
    setLoading((prev) => ({
      ...prev,
      stockLevel: true,
    }));
    const fetchStockLevelReport = async () => {
      const { data: stockLevelReportData } = await getCategorizedReport(
        "items",
        "stock-level",
      );

      const { rows } = stockLevelReportData as unknown as CountExpiryInfo;
      if (rows) {
        setReportSections((prev) => ({
          ...prev,
          stockLevelReport: mapToReportInfo(rows),
        }));
      }

      setLoading((prev) => ({
        ...prev,
        stockLevel: false,
      }));
    };

    void fetchStockLevelReport();
  }, []);

  useEffect(() => {
    setLoading((prev) => ({
      ...prev,
      periodicSales: true,
    }));
    const fetchSalesLevelReport = async () => {
      const { data: SalesReportData } = await getCategorizedReport(
        "sales",
        "periodic-sales",
      );

      const { rows } =
        SalesReportData as unknown as CountExpiryInfo<PeriodicSalesDto>;

      if (rows) {
        const periodicSalesResponse = rows.flatMap(({ saleItems }) =>
          saleItems.map(
            ({
              batchId,
              batchNumber,
              quantity,
              item: { name, sellingPrice },
            }) => ({
              id: batchId,
              name: `${name} (${batchNumber})`,
              quantity: `${sellingPrice} (${quantity})`,
              total: `GHS ${quantity * sellingPrice}`,
            }),
          ),
        );
        setPeriodicSales(periodicSalesResponse);
      }

      setLoading((prev) => ({
        ...prev,
        periodicSales: false,
      }));
    };

    void fetchSalesLevelReport();
  }, []);
  useEffect(() => {
    setLoading((prev) => ({
      ...prev,
      topSales: true,
    }));
    const fetchTopSelling = async () => {
      const { data: topSellingReport } = await getCategorizedReport(
        "sales",
        "top-selling",
      );

      const { rows } =
        topSellingReport as unknown as CountExpiryInfo<TopSellingDto>;
      if (rows) {
        const topSellingResponse = rows.map(
          ({
            item: { id, name, sellingPrice },
            totalQuantity,
            totalSales,
          }) => ({
            id,
            name,
            quantity: `${sellingPrice} (${totalQuantity})`,
            total: `GHS ${totalSales}`,
          }),
        );
        setTopSelling(topSellingResponse);
      }
      setLoading((prev) => ({
        ...prev,
        topSales: false,
      }));
    };

    void fetchTopSelling();
  }, []);

  function mapToReportInfo(items: ReportInfoDto[]): ReportInfo[] {
    return items.map(({ batchNumber, item: { id, name }, validity }) => ({
      id,
      name: `${name} (${batchNumber})`,
      quantity: validity.split("T")[0],
    }));
  }
  return (
    <ScrollArea className="mt-2 h-[calc(100%_-_5rem)] rounded-2xl bg-white pr-4">
      <ReportCategory category="Inventory Report" classname="mt-2 -mb-4" />
      <ReportHeader
        title="REPORT NAME (Batch number)"
        option="Type"
        variant="Quantity"
      />

      <ReportAccordion
        title="STOCK LEVEL REPORT"
        type="Stock Level Reports"
        reportReference={reportSections.stockLevelReport}
        loading={loading.stockLevel}
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
        loading={loading.expiry}
      />
      <ReportAccordion
        title="EXPIRY HIGH RISK"
        type="High Risk"
        reportReference={reportSections.highRisk}
        loading={loading.expiry}
      />
      <ReportAccordion
        title="EXPIRY CRITICAL"
        type="Critical"
        reportReference={reportSections.critical}
        loading={loading.expiry}
      />
      <ReportAccordion
        title="EXPIRED"
        type="Expired"
        reportReference={reportSections.expired}
        loading={loading.expiry}
      />

      <ReportCategory
        category="Sales and Finance Report"
        classname="mt-4 -mb-4"
      />

      <ReportHeader
        title="REPORT NAME (Batch number)"
        option="Type"
        variant="Quantity"
      />

      <ReportAccordion
        title="SALES AND FINANCIAL REPORTS"
        type="Sales and Financial Reports"
        reportReference={saleNameId}
        loading={financeLoading}
      />
      <ReportCategory
        category="Customer and Sales Trends Reports"
        classname="mt-4 -mb-4"
      />
      <ReportHeader
        title="SALES NAME"
        option="Total Sales"
        variant="Selling Price(Quantity)"
      />

      <ReportAccordion
        title="TOP SALES REPORT"
        type="Total sales"
        reportReference={topSelling}
        loading={loading.topSales}
      />
      <ReportAccordion
        title="PERIODIC SALES REPORT"
        type="Periodic Sales Reports"
        reportReference={periodicSales}
        loading={loading.periodicSales}
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

type ReportCategoryProps = {
  category: string;
  classname?: string;
};
const ReportCategory = ({ category, classname }: ReportCategoryProps) => (
  <div className={cn(classname, "text-blue-600")}>{category}</div>
);
