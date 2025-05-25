export type HandleRequestState = {
  loadingMsg?: string;
  successMsg?: string;
  errorMsg?: string;
  res: Promise<Record<string, unknown>>;
};

export type DateRangeQueryOptions =
  | "today"
  | "this_week"
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_three_month";
export type GenerateQueryParams = Partial<{
  id: string;
  search: string;
  page: string;
  pageSize: string;
  orderBy: string;
  orderDirection: "ASC" | "DESC";
  dateRange: DateRangeQueryOptions;
  todaySales: boolean;
  status: "PAID" | "UNPAID" | "LOW" | "STOCKED" | "OUT_OF_STOCK";
  startDate: string;
  endDate: string;
  [key: string]: string | number | boolean;
}>;

export enum CRUDACTION {
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  VIEW = "view",
  DEACTIVATE = "deactivate",
  ACTIVATE = "activate",
  STATUS = "status",
  ACCEPT = "accept",
  DECLINE = "cancel",
  DELIVERED = "delivered",
}

export type CrudAction =
  | "create"
  | "edit"
  | "delete"
  | "view"
  | "deactivate"
  | "activate"
  | "status"
  | "accept"
  | "cancel"
  | "delivered";

export enum ActiveDeactivedStatus {
  ACTIVE = "Active",
  DEACTIVATE = "Deactivated",
}
