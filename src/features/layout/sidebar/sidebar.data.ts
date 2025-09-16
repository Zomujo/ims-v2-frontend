import { PermissionModules } from "@features/shared/types/auth-action.types";

export const generalTabs = [
  {
    name: "Dashboard",
    icon: "solar:chart-2-outline",
    link: "/dashboard",
  },
  {
    name: "Inventory",
    icon: "solar:hospital-bold-duotone",
    subs: [
      {
        name: "Items",
        icon: "solar:jar-of-pills-bold-duotone",
        link: "/items",
        permission: PermissionModules.ITEMS,
      },
      {
        name: "Categories",
        icon: "solar:pills-bold-duotone",
        link: "/categories",
        permission: PermissionModules.ITEMS_CATEGORIES,
      },
      {
        name: "Stock Adjustment",
        icon: "solar:delivery-bold-duotone",
        link: "/stock-adjustment",
        permission: PermissionModules.STOCK_ADJUSTMENT,
      },
      {
        name: "Expiry",
        icon: "solar:bone-crack-bold",
        link: "/expiry",
        permission: PermissionModules.ITEMS,
      },
    ],
  },
  {
    name: "Orders",
    icon: "solar:cart-large-bold-duotone",
    subs: [
      {
        name: "Item orders",
        icon: "solar:box-bold-duotone",
        link: "/item-orders",
        permission: PermissionModules.ITEMS_ORDERS,
      },
      {
        name: "Suppliers",
        icon: "solar:buildings-3-bold-duotone",
        link: "/suppliers",
        permission: PermissionModules.SUPPLIERS,
      },
    ],
  },
  {
    name: "Sales",
    icon: "solar:bill-list-bold-duotone",
    link: "/sales",
    permission: PermissionModules.SALES,
  },
  {
    name: "Department Requests",
    icon: "solar:box-bold-duotone",
    link: "/department-requests",
    permission: PermissionModules.DEPARTMENT_REQUESTS,
    forFacility: true,
  },
  {
    name: "Reports",
    icon: "solar:graph-up-bold-duotone",
    link: "/reports",
    permission: PermissionModules.REPORTS,
  },
  {
    name: "Activity",
    icon: "solar:shield-network-bold",
    subs: [
      {
        name: "Audit Logs",
        icon: "solar:transmission-line-duotone",
        link: "/audit-logs",
        permission: PermissionModules.REPORTS,
      },
    ],
  },
];

export const helpTabs = [
  {
    name: "Video Tutorials",
    icon: "solar:video-frame-bold-duotone",
    link: "/tutorials",
  },
  {
    name: "USSD codes",
    icon: "solar:phone-calling-bold-duotone",
    link: "/ussd-codes",
  },
];
