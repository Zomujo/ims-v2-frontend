import { ColumnDef } from "@tanstack/react-table";
import { GetReportDto } from "../shared/types/action.types";

export const reportsTableColumns: ColumnDef<GetReportDto>[] = [];

export enum ReportId {
  StockLevelReport = "stock-level-report",
  StockMovementReport = "stock-movement-report",
  EarningsOverviewReport = "earnings-overview",
}
