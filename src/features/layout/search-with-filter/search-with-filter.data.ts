import { ActiveDeactivedStatus } from "@/features/shared/types/utitls.types";
import { PAGE_ROUTES } from "@/lib/constant";
import {
  ItemOrderStatus,
  ITEMS_STATUS,
  RequestStatus,
  StockAdjustmentStatus,
  StockAdjustmentType,
  ValidityStatus,
} from "@features/shared/types/action.types";
import { SALES_STATUS } from "@features/shared/types/sales-action.types";
import {
  PermissionActions,
  PermissionModules,
  UserRole,
  UserStatus,
} from "@features/shared/types/auth-action.types";
import { ActionType, TableName } from "@features/shared/types/activity.types";
import { camelCaseToSentence } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/api-constants";

export const exportActionButtonData = {
  [PAGE_ROUTES.ITEMS.VIEW]: {
    label: "Export Items",
    fileName: "Items",
    endpoint: API_ENDPOINTS.ITEMS_EXPORT,
    icon: "solar:file-download-linear",
    permission: `${PermissionModules.ITEMS}:${PermissionActions.READ}`,
  },
  [PAGE_ROUTES.EXPIRY.VIEW]: {
    label: "Export Expiry Report",
    fileName: "Expiry_Report",
    endpoint: API_ENDPOINTS.ITEMS_VALIDITY_EXPORT,
    icon: "solar:file-download-linear",
    permission: `${PermissionModules.ITEMS}:${PermissionActions.READ}`,
  },
  [PAGE_ROUTES.STOCK_ADJUSTMENT.VIEW]: {
    label: "Export Stock Adjustments",
    fileName: "Stock_Adjustments",
    endpoint: API_ENDPOINTS.STOCK_ADJUSTMENTS_EXPORT,
    icon: "solar:file-download-linear",
    permission: `${PermissionModules.STOCK_ADJUSTMENT}:${PermissionActions.READ}`,
  },
  [PAGE_ROUTES.AUDIT_LOGS]: {
    label: "Export Audit Logs",
    fileName: "Audit_Logs",
    endpoint: API_ENDPOINTS.AUDITS_EXPORT,
    icon: "solar:file-download-linear",
    permission: `${PermissionModules.REPORTS}:${PermissionActions.READ}`,
  },
  [PAGE_ROUTES.SALES.VIEW]: {
    label: "Export Sales",
    fileName: "Sales",
    endpoint: API_ENDPOINTS.SALE_EXPORT,
    icon: "solar:file-download-linear",
    permission: `${PermissionModules.SALES}:${PermissionActions.READ}`,
  },
};

export const actionButtonData = {
  [PAGE_ROUTES.SALES.VIEW]: {
    label: "Record New Sale",
    href: PAGE_ROUTES.SALES.RECORD,
    icon: "solar:bill-list-bold-duotone",
    permission: `${PermissionModules.SALES}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.ITEMS.VIEW]: {
    label: "Add New Item",
    href: PAGE_ROUTES.ITEMS.CREATE,
    icon: "solar:jar-of-pills-bold-duotone",
    permission: `${PermissionModules.ITEMS}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.EXPIRY.VIEW]: {
    icon: "solar:jar-of-pills-bold-duotone",
    permission: `${PermissionModules.ITEMS}:${PermissionActions.READ}`,
  },
  [PAGE_ROUTES.ITEM_BATCHES]: {
    label: "Add New Batch",
    href: PAGE_ROUTES.ITEMS.CREATE,
    icon: "solar:jar-of-pills-bold-duotone",
    permission: `${PermissionModules.ITEMS}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.CATEGORIES.VIEW]: {
    label: "Add New Category",
    href: PAGE_ROUTES.CATEGORIES.CREATE,
    icon: "solar:pills-bold-duotone",
    permission: `${PermissionModules.ITEMS_CATEGORIES}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.STOCK_ADJUSTMENT.VIEW]: {
    label: "Add New Adjustment",
    href: PAGE_ROUTES.STOCK_ADJUSTMENT.CREATE,
    icon: "solar:delivery-bold-duotone",
    permission: `${PermissionModules.STOCK_ADJUSTMENT}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.ITEM_ORDERS.VIEW]: {
    label: "Add New Order",
    href: PAGE_ROUTES.ITEM_ORDERS.CREATE,
    icon: "solar:box-bold-duotone",
    permission: `${PermissionModules.ITEMS_ORDERS}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.DEPARTMENTS_REQUESTS.VIEW]: {
    label: "Add New Request",
    href: PAGE_ROUTES.DEPARTMENTS_REQUESTS.CREATE,
    icon: "solar:box-bold-duotone",
    permission: `${PermissionModules.DEPARTMENT_REQUESTS}:${PermissionActions.WRITE}`,
    roles: [UserRole.Pharmacist, UserRole.DepartmentAdmin],
  },
  [PAGE_ROUTES.SUPPLIERS.VIEW]: {
    label: "Add New Supplier",
    href: PAGE_ROUTES.SUPPLIERS.CREATE,
    icon: "solar:buildings-3-bold-duotone",
    permission: `${PermissionModules.SUPPLIERS}:${PermissionActions.WRITE}`,
  },
  [PAGE_ROUTES.REPORTS]: {
    label: "Generate Report",
    href: PAGE_ROUTES.REPORTS,
    icon: "solar:graph-up-bold-duotone",
  },
  [PAGE_ROUTES.AUDIT_LOGS]: {
    label: "View Audit Logs",
    icon: "solar:activity-bold-duotone",
    permission: `${PermissionModules.REPORTS}:${PermissionActions.READ}`,
    hideSearch: true,
  },
};

export const iconsAndNames = [
  { name: "Dashboard", icon: "solar:chart-2-outline" },
  { name: "Items", icon: "solar:jar-of-pills-bold-duotone" },
  { name: "Categories", icon: "solar:pills-bold-duotone" },
  { name: "Stock Adjustment", icon: "solar:delivery-bold-duotone" },
  { name: "Item orders", icon: "solar:box-bold-duotone" },
  { name: "Suppliers", icon: "solar:buildings-3-bold-duotone" },
  { name: "Sales", icon: "solar:bill-list-bold-duotone" },
  { name: "Department Requests", icon: "solar:box-bold-duotone" },
  { name: "Stock Requests", icon: "solar:box-bold-duotone" },
  { name: "Reports", icon: "solar:graph-up-bold-duotone" },
];

export const itemStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Stocked", value: ITEMS_STATUS.STOCKED },
    { label: "Low Stock", value: ITEMS_STATUS.LOW },
    { label: "Out of Stock", value: ITEMS_STATUS.OUT_OF_STOCK },
  ],
  defaultValue: "",
};

export const categoriesFilter = {
  key: "categories",
  label: "Categories",
  type: "checkbox" as const,
  options: [],
  defaultValue: [],
};

export const usersFilter = {
  key: "userId",
  label: "Users",
  type: "radio" as const,
  options: [],
  defaultValue: [],
};

export const departmentsFilter = {
  key: "departmentId",
  label: "Departments",
  type: "radio" as const,
  options: [],
  defaultValue: [],
};

export enum DATE_RANGE {
  ALL = "",
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  LAST_THREE_MONTHS = "last_three_months",
  THIS_YEAR = "this_year",
}

export const dateRangeOptions = [
  { label: "All", value: DATE_RANGE.ALL },
  { label: "Today", value: DATE_RANGE.TODAY },
  { label: "This Week", value: DATE_RANGE.THIS_WEEK },
  { label: "This Month", value: DATE_RANGE.THIS_MONTH },
  { label: "Last Month", value: DATE_RANGE.LAST_MONTH },
  { label: "Last Three Months", value: DATE_RANGE.LAST_THREE_MONTHS },
  { label: "This Year", value: DATE_RANGE.THIS_YEAR },
];

export const moduleOptions = {
  key: "tableNames",
  label: "Module",
  type: "checkbox" as const,
  options: Object.values(TableName).map((tableName) => ({
    label: camelCaseToSentence(tableName),
    value: tableName,
  })),
  defaultValue: "",
};

export const dateRangeFilter = {
  key: "dateRange",
  label: "Date Range",
  type: "radio" as const,
  options: dateRangeOptions,
  defaultValue: "",
};

export const adjustmentTypeFilter = {
  key: "type",
  label: "Adjustment Type",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Increment", value: StockAdjustmentType.INCREMENT },
    { label: "Reduction", value: StockAdjustmentType.REDUCTION },
  ],
  defaultValue: "",
};

export const adjustmentStatusFilter = {
  key: "status",
  label: "Adjustment Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Submitted", value: StockAdjustmentStatus.SUBMITTED },
    { label: "Adjusted", value: StockAdjustmentStatus.ADJUSTED },
    { label: "Rejected", value: StockAdjustmentStatus.REJECTED },
  ],
  defaultValue: "",
};

export const validityStatusFilter = {
  key: "status",
  label: "Validity Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Expired", value: ValidityStatus.EXPIRED },
    { label: "Critical", value: ValidityStatus.CRITICAL },
    { label: "Approaching", value: ValidityStatus.APPROACHING },
    { label: "Safe", value: ValidityStatus.SAFE },
  ],
  defaultValue: "",
};

export const orderStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Requested", value: ItemOrderStatus.REQUESTED },
    { label: "Draft", value: ItemOrderStatus.DRAFT },
    { label: "Cancelled", value: ItemOrderStatus.CANCELLED },
    { label: "Delivering", value: ItemOrderStatus.DELIVERING },
    { label: "Received", value: ItemOrderStatus.RECEIVED },
  ],
  defaultValue: "",
};
export const categoriesStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Active", value: ActiveDeactivedStatus.ACTIVE },
    { label: "Deactivated", value: ActiveDeactivedStatus.DEACTIVATE },
  ],
  defaultValue: "",
};

export const salesStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Paid", value: SALES_STATUS.PAID },
    { label: "Unpaid", value: SALES_STATUS.UNPAID },
  ],
  defaultValue: "",
};

export const userStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Active", value: UserStatus.ACTIVE },
    { label: "Inactive", value: UserStatus.INACTIVE },
    { label: "Pending", value: UserStatus.PENDING },
    { label: "Accepted", value: UserStatus.ACCEPTED },
    { label: "Declined", value: UserStatus.DECLINED },
  ],
  defaultValue: "",
};

export const userRoleFilter = {
  key: "role",
  label: "Role",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Central Admin", value: UserRole.CentralAdmin },
    { label: "Department Admin", value: UserRole.DepartmentAdmin },
    { label: "Pharmacist", value: UserRole.Pharmacist },
  ],
  defaultValue: "",
};

export const todaySalesFilters = {
  key: "todaySales",
  label: "Today's Sales",
  type: "boolean" as const,
  options: [],
  defaultValue: true,
};

export const requestStatusFilter = {
  key: "status",
  label: "Status",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Accepted", value: RequestStatus.ACCEPTED },
    { label: "Delivered", value: RequestStatus.DELIVERED },
    { label: "Pending", value: RequestStatus.PENDING },
    { label: "Cancelled", value: RequestStatus.CANCELLED },
  ],
  defaultValue: "",
};

export const actionsFilter = {
  key: "action",
  label: "Actions",
  type: "radio" as const,
  options: [
    { label: "All", value: "" },
    { label: "Create", value: ActionType.CREATE },
    { label: "Edit", value: ActionType.UPDATE },
    { label: "Delete", value: ActionType.DELETE },
  ],
  defaultValue: "",
};
