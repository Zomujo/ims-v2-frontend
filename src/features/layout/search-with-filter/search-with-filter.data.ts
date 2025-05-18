import { PAGE_ROUTES } from "@/lib/constant";
import {
  ActiveInactiveStatus,
  ItemOrderStatus,
  ITEMS_STATUS,
  StockAdjustmentStatus,
  StockAdjustmentType,
} from "@features/shared/types/action.types";

export const actionButtonData = {
  [PAGE_ROUTES.SALES.VIEW]: {
    label: "Record New Sale",
    href: PAGE_ROUTES.SALES.RECORD,
    icon: "solar:bill-list-bold-duotone",
  },
  [PAGE_ROUTES.ITEMS.VIEW]: {
    label: "Add New Item",
    href: PAGE_ROUTES.ITEMS.CREATE,
    icon: "solar:jar-of-pills-bold-duotone",
  },
  [PAGE_ROUTES.ITEM_BATCHES]: {
    label: "Add New Batch",
    href: PAGE_ROUTES.ITEMS.CREATE,
    icon: "solar:jar-of-pills-bold-duotone",
  },
  [PAGE_ROUTES.CATEGORIES.VIEW]: {
    label: "Add New Category",
    href: PAGE_ROUTES.CATEGORIES.CREATE,
    icon: "solar:pills-bold-duotone",
  },
  [PAGE_ROUTES.STOCK_ADJUSTMENT.VIEW]: {
    label: "Add New Adjustment",
    href: PAGE_ROUTES.STOCK_ADJUSTMENT.CREATE,
    icon: "solar:delivery-bold-duotone",
  },
  [PAGE_ROUTES.ITEM_ORDERS.VIEW]: {
    label: "Add New Order",
    href: PAGE_ROUTES.ITEM_ORDERS.CREATE,
    icon: "solar:box-bold-duotone",
  },
  [PAGE_ROUTES.DEPARTMENTS_REQUESTS.VIEW]: {
    label: "Add New Request",
    href: PAGE_ROUTES.DEPARTMENTS_REQUESTS.CREATE,
    icon: "solar:box-bold-duotone",
  },
  [PAGE_ROUTES.SUPPLIERS.VIEW]: {
    label: "Add New Supplier",
    href: PAGE_ROUTES.SUPPLIERS.CREATE,
    icon: "solar:buildings-3-bold-duotone",
  },
  [PAGE_ROUTES.REPORTS]: {
    label: "Generate Report",
    href: PAGE_ROUTES.REPORTS,
    icon: "solar:graph-up-bold-duotone",
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

enum DATE_RANGE {
  ALL = "",
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  LAST_THREE_MONTHS = "last_three_months",
  THIS_YEAR = "this_year",
}

export const dateRangeFilter = {
  key: "dateRange",
  label: "Date Range",
  type: "radio" as const,
  options: [
    { label: "All", value: DATE_RANGE.ALL },
    { label: "Today", value: DATE_RANGE.TODAY },
    { label: "This Week", value: DATE_RANGE.THIS_WEEK },
    { label: "This Month", value: DATE_RANGE.THIS_MONTH },
    { label: "Last Month", value: DATE_RANGE.LAST_MONTH },
    { label: "Last Three Months", value: DATE_RANGE.LAST_THREE_MONTHS },
    { label: "This Year", value: DATE_RANGE.THIS_YEAR },
  ],
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
    { label: "Active", value: ActiveInactiveStatus.ACTIVE },
    { label: "Inactive", value: ActiveInactiveStatus.INACTIVE },
  ],
  defaultValue: "",
};
