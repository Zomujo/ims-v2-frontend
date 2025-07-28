"use client";
import DateWithTable from "@/features/reports/report-details/dateWithTable";
import { GeneralExport } from "@/features/reports/report-details/generalExport";
import { CardInfo } from "@/features/reports/report-details/reportCardInfo";
import ReportInfo from "@/features/reports/report-details/reportInfo";
import { PreviewModal } from "@/features/reports/report-details/reportPreview";
import { getCategorizedReport } from "@/features/shared/actions/report.actions";
import useFetchData from "@/features/shared/hooks/use-fetch-data";
import useImsSearchParams from "@/features/shared/hooks/use-ims-search-params";
import {
  CardData,
  CountExpiryInfo,
  ReportInfoDto,
  SalesDto,
  SalesReportInfo,
  ViewMode,
} from "@/features/shared/types/action.types";
import { ScrollArea } from "@/features/ui/scroll-area";
import { useSessionData } from "@/hooks/useSessionData";
import { ColumnDef } from "@tanstack/react-table";
import { endOfMonth, format } from "date-fns";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const ReportDetails = () => {
  const [itemCount, setItemCount] = useState(0);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [reportType, setReportType] = useState("");
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [showPreview, setShowPreview] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const [reportInformation, setReportInformation] = useState({
    reportName: "",
    fileName: "",
  });
  const { facilityName } = useSessionData();
  const { setSearchParams, removeSearchParams } = useImsSearchParams();

  const routeParams = useMemo(() => {
    const reportId = params["report-id"];
    switch (reportId) {
      case "stock-level-report":
        return { category: "items", id: "stock-level" };

      case "earnings-overview":
        return { category: "sales", id: "periodic-sales" };
      default:
        return { category: "", id: "" };
    }
  }, [params]);

  const { data, loading: isLoading } = useFetchData({
    fetchFn: getCategorizedReport,
    routeParams,
  });
  useEffect(() => {
    const reportId = params["report-id"];

    switch (reportId) {
      case "stock-level-report":
        setReportType("Stock Level Report");
        break;

      case "earnings-overview":
        setReportType("Sales Level Report");
        break;

      case "Expiry":
        setReportType("Expiry Report");
        break;

      default:
        setReportType("");
    }
  }, [params]);

  useEffect(() => {
    const isDay = viewMode === "day";
    const allReports = viewMode === "all";
    const isRange =
      viewMode === "last_three_months" || viewMode === "this_week";
    const fetchStockLevelReport = async () => {
      const firstDay = new Date(selectedDate);
      const startDate = format(firstDay.setDate(1), "yyyy-MM-dd");
      const endDate =
        viewMode === "month"
          ? format(endOfMonth(firstDay), "yyyy-MM-dd")
          : format(selectedDate, "yyyy-MM-dd");
      const specificDate =
        viewMode === "day" ? format(selectedDate, "yyyy-MM-dd") : undefined;

      if (!(isDay || allReports)) {
        removeSearchParams("specificDate");
        removeSearchParams("dateRange");
        setSearchParams({ key: "startDate", value: startDate });
        setSearchParams({ key: "endDate", value: endDate });
      }

      if (isDay) {
        removeSearchParams("startDate");
        removeSearchParams("endDate");
        removeSearchParams("dateRange");
        setSearchParams({ key: "specificDate", value: String(specificDate) });
      }

      if (isRange) {
        removeSearchParams("startDate");
        removeSearchParams("endDate");
        removeSearchParams("specificDate");
        setSearchParams({ key: "dateRange", value: viewMode });
      }
    };
    void fetchStockLevelReport();
  }, [selectedDate, viewMode, reportType]);

  useEffect(() => {
    if (reportType === "Stock Level Report") {
      const { rows } = data?.data as unknown as CountExpiryInfo;
      if (rows) {
        setCardData([
          {
            title: "TOTAL STOCK",
            value: rows.length,
            percentage: 0,
            isNegative: true,
            type: "number",
          },
        ]);
      }
    }

    if (reportType === "Sales Level Report") {
      const { rows, analytics } = data?.data as unknown as SalesReportInfo;

      if (rows) {
        const {
          totalSales,
          totalItems: { percentageChange, changeType, data: salesData },
          totalRevenue: {
            data: revenueData,
            changeType: revenueChangeType,
            percentageChange: revenuePercentageType,
          },
        } = analytics;
        setRevenue(revenueData);

        setItemCount(totalSales);

        setCardData([
          {
            title: "TOTAL ITEMS SOLD",
            value: salesData,
            percentage: percentageChange,
            isNegative: changeType === "DECREASED" ? true : false,
            type: "number",
          },
          {
            title: "TOTAL REVENUE",
            value: revenueData,
            percentage: revenuePercentageType,
            isNegative: revenueChangeType === "DECREASED" ? true : false,
            type: "number",
          },
        ]);
      } else {
        setCardData([]);
        setItemCount(0);
        setRevenue(0);
      }
    }
  }, [data]);

  const handleTableHeader = useCallback(() => {
    const reportId = params["report-id"];

    switch (reportId) {
      case "Expiry":
      case "stock-level-report":
        return {
          type: "stock" as const,
          header: stockTableColumns,
          data: (data?.data?.rows as unknown as ReportInfoDto[]) || [],
        };

      default:
        return {
          type: "sales" as const,
          header: salesTableColumns,
          data: (data?.data?.rows as unknown as SalesDto[]) || [],
        };
    }
  }, [params, data]);

  return (
    <ScrollArea className="-mt-20 h-[calc(100%_-_5rem)]">
      <GeneralExport
        openModal={() => setShowPreview(true)}
        reportTitle={reportType}
      />
      <ReportInfo
        setExportName={(value) => {
          setSearchParams({ key: "exportFileName", value });
          if (value === "") {
            removeSearchParams("exportFileName");
          }
        }}
        setReportName={(value) =>
          setReportInformation((prev) => ({ ...prev, reportName: value }))
        }
      />
      <CardInfo cardData={cardData} />

      {(() => {
        const result = handleTableHeader();

        if (result.type === "stock") {
          return (
            <>
              <DateWithTable<ReportInfoDto>
                tableHeader={result.header}
                tableData={result.data}
                count={itemCount}
                summaryTitle="Total Items"
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                loading={isLoading}
              />
              <PreviewModal
                onClose={() => setShowPreview(false)}
                isOpen={showPreview}
                title={reportInformation.reportName}
                clinicName={facilityName}
                metrics={{
                  totalItems: itemCount,
                  totalRevenue: revenue,
                  currency: "GHS",
                }}
                columnData={result.header}
                rowData={result.data}
              />
            </>
          );
        } else {
          return (
            <>
              <DateWithTable<SalesDto>
                tableHeader={result.header}
                tableData={result.data}
                count={itemCount}
                summaryTitle="Total Items"
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                loading={isLoading}
              />
              <PreviewModal
                onClose={() => setShowPreview(false)}
                isOpen={showPreview}
                title={reportInformation.reportName}
                clinicName={facilityName}
                metrics={{
                  totalItems: itemCount,
                  totalRevenue: revenue,
                  currency: "GHS",
                }}
                columnData={result.header}
                rowData={result.data}
              />
            </>
          );
        }
      })()}
    </ScrollArea>
  );
};

export default ReportDetails;

const stockTableColumns: ColumnDef<ReportInfoDto>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt ?? ""), "dd MMM yyyy");
    },
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "item.name",
    header: "Name",
  },
  {
    accessorKey: "validity",
    header: "Validity",
    cell: ({ row }) => {
      return format(new Date(row.original.validity ?? ""), "dd MMM yyyy");
    },
  },
];
const salesTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.original?.createdAt ?? ""), "dd MMM yyyy");
    },
  },
  {
    accessorKey: "saleItems.itemName",
    header: "Item(s)",
    cell: ({ row }) => {
      const { itemName, totalQuantity } = row.original.saleItems;
      return (
        <div className="flex items-center gap-2">
          {itemName}{" "}
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-amber-300">
            {totalQuantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy.fullName",
    header: "Recorded By",
  },
  {
    accessorKey: "saleItems.remainderItems",
    header: "Quantity Remaining",
    cell: ({ row }) => {
      const { remainderItems } = row.original.saleItems;
      return <div className="ml-6">{remainderItems}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
