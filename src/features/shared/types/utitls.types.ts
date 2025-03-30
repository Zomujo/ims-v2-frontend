export type HandleRequestState = {
  loadingMsg?: string;
  successMsg?: string;
  errorMsg?: string;
  res: Promise<Record<string, unknown>>;
};

type DateRangeQueryOptions =
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
}>;

export enum CRUDACTION {
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  VIEW = "view",
  DEACTIVATE = "deactivate",
  ACTIVATE = "activate",
  STATUS = "status",
}

export type CrudAction =
  | "create"
  | "edit"
  | "delete"
  | "view"
  | "deactivate"
  | "activate"
  | "status";
