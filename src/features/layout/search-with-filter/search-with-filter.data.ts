import { PAGE_ROUTES } from "@/lib/constant";

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
