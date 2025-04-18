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
        permission: "items",
      },
      {
        name: "Categories",
        icon: "solar:pills-bold-duotone",
        link: "/categories",
        permission: "item_categories",
      },
      {
        name: "Stock Adjustment",
        icon: "solar:delivery-bold-duotone",
        link: "/stock-adjustment",
        permission: "stock_adjustment",
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
        permission: "item_orders",
      },
      {
        name: "Suppliers",
        icon: "solar:buildings-3-bold-duotone",
        link: "/suppliers",
        permission: "suppliers",
      },
    ],
  },
  {
    name: "Sales",
    icon: "solar:bill-list-bold-duotone",
    link: "/sales",
    permission: "sales",
  },
  {
    name: "Department Requests",
    icon: "solar:box-bold-duotone",
    link: "/department-requests",
    permission: "department_requests",
    forFacility: true,
  },
  {
    name: "Stock Requests",
    icon: "solar:box-bold-duotone",
    link: "/item-requests",
    permission: "department_requests",
    forDepartment: true,
  },
  {
    name: "Reports",
    icon: "solar:graph-up-bold-duotone",
    link: "/reports",
    permission: "reports",
  },
];

export const helpTabs = [
  {
    name: "Video Tutorials",
    icon: "solar:video-frame-bold-duotone",
    link: "/tutorials",
  },

  {
    name: "Support",
    icon: "solar:help-bold-duotone",
    link: "/support",
  },
];
