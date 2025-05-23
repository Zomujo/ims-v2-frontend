export const API_ENDPOINTS = {
  // API Health Checks
  HEALTH: "/health",

  // Notifications
  NOTIFICATIONS_STREAM: "/notifications/stream",
  NOTIFICATIONS: "/notifications",
  NOTIFICATIONS_READ_ALL: "/notifications/read",
  NOTIFICATIONS_READ_ONE: "/notifications/:id/read",
  NOTIFICATIONS_DELETE: "/notifications/:id",

  // Authentication
  AUTH_SIGNUP: "/auth/signup",
  AUTH_PROFILE_PICTURE: "/auth/profile-picture",
  AUTH_LOGIN: "/auth/login",
  AUTH_USER: "/auth/user",
  AUTH_SESSIONS: "/auth/sessions",
  AUTH_REFRESH: "/auth/refresh",
  AUTH_FORGOT_PASSWORD_SEND_MAIL: "/auth/forgot-password/send-mail",
  AUTH_FORGOT_PASSWORD_VALIDATE_CODE: "/auth/forgot-password/validate-code",
  AUTH_FORGOT_PASSWORD_RESET: "/auth/forgot-password/reset",
  AUTH_UPDATE_USER: "/auth",
  AUTH_CHANGE_EMAIL_SEND_MAIL: "/auth/change-email/send-mail",
  AUTH_CHANGE_EMAIL_VALIDATE_OTP: "/auth/change-email/validate-otp",
  AUTH_CHANGE_PASSWORD: "/auth/change-password",
  AUTH_DELETE_SESSION: "/auth/session/:id",

  // Facility
  FACILITIES: "/facilities",
  FACILITY: "/facilities/:id",

  // User
  USER_SETTINGS: "/user/settings",

  // Admin
  ADMIN_USER: "/admin/user",
  ADMIN_USERS: "/admin/users",

  // Supplier
  SUPPLIERS: "/suppliers",
  SUPPLIER: "/suppliers/:id",
  SUPPLIERS_NO_PAGINATE: "/suppliers/no-paginate",
  SUPPLIERS_BULK_DELETE: "/suppliers/bulk-delete",

  // Item Category
  ITEM_CATEGORIES: "/item-categories",
  ITEM_CATEGORIES_NO_PAGINATE: "/item-categories/no-paginate",
  ITEM_CATEGORY: "/item-categories/:id",

  // Items
  ITEMS: "/items",
  ITEM: "/items/:id",
  ITEMS_ADD_BATCH: "/items/add-batch",
  ITEMS_BATCHES_NO_PAGINATE: "/items/batches/:itemId/no-paginate",
  ITEM_BATCHES: "/items/:id/batches",
  ITEM_BATCH: "/items/batches/:id",
  ITEM_EDIT_BATCH: "/items/edit-batch/:id",
  ITEMS_NO_PAGINATE: "/items/no-paginate",
  ITEM_ANALYTICS: "/items/analytics/:id",
  ITEM_COUNTS: "/items/counts",
  ITEM_ADJUST_PRICES: "/items/adjust-prices/:id",

  // Department Item Requests Endpoints
  ITEM_REQUESTS: "/item-requests",
  ITEM_REQUEST: "/item-requests/:id",

  // Item Orders Endpoints
  ITEM_ORDERS: "/item-orders",
  ITEM_ORDER: "/item-orders/:id",
  ITEM_ORDER_STATE: "/item-orders/state/:id",

  // Stock Adjustments Endpoints
  STOCK_ADJUSTMENTS: "/stock-adjustments",
  STOCK_ADJUSTMENT: "/stock-adjustments/:id",

  // Report
  REPORTS: "/reports",
  REPORT: "/reports/:id",
  REPORT_DATA: "/reports/:id/data",
  REPORT_SALES: "/reports/periodic_sales_report/data",

  // Sales
  SALES: "/sales",
  SALE: "/sales/:id",
  SALE_ITEMS: "/sales/:id/items",
  SALE_RETURN: "/sales/return/:id",

  // Patient
  PATIENTS: "/patients",
  PATIENT: "/patients/:id",

  // Department Request
  DEPARTMENT_REQUESTS: "/department-requests",
  DEPARTMENT_REQUEST: "/department-requests/:id",
  DEPARTMENT_REQUESTS_ITEM: "/department-requests/item",
  DEPARTMENT_REQUEST_STATUS: "/department-requests/:id/status",
  DEPARTMENT_ITEM_REQUESTS: "/item-requests",
  DEPARTMENT_ITEM_REQUEST: "/item-requests/:id",

  // Complaint
  COMPLAINTS: "/complaints",
} as const;

export const API_ENDPOINT_TAGS = {
  // API Health Checks
  HEALTH: "api-v1-health",

  // Notifications
  NOTIFICATIONS_STREAM: "api-v1-notifications-stream",
  NOTIFICATIONS: "api-v1-notifications",

  // Authentication
  AUTH_USER: "api-v1-auth-user",
  AUTH_SESSIONS: "api-v1-auth-sessions",
  AUTH_REFRESH: "api-v1-auth-refresh",

  // Facility
  FACILITIES: "api-v1-facilities",

  // User
  USER_SETTINGS: "api-v1-user-settings",

  // Admin
  ADMIN_USERS: "api-v1-admin-users",

  // Supplier
  SUPPLIERS: "api-v1-suppliers",
  SUPPLIERS_NO_PAGINATE: "api-v1-suppliers-no-paginate",

  // Items
  ITEMS: "api-v1-items",
  ITEMS_BATCHES: "api-v1-items-batches",

  // Item Category
  ITEM_CATEGORIES: "api-v1-item-categories",

  // New Tags
  ITEM_REQUESTS: "api-v1-item-requests",
  ITEM_ORDERS: "api-v1-item-orders",
  STOCK_ADJUSTMENTS: "api-v1-stock-adjustments",

  // Report
  REPORTS: "api-v1-reports",

  // Sales
  SALES: "api-v1-sales",

  // Patient
  PATIENTS: "api-v1-patients",

  // Department Request
  DEPARTMENT_REQUESTS: "api-v1-department-requests",
  DEPARTMENT_REQUESTS_ITEM: "api-v1-department-requests-item",
  DEPARTMENT_ITEM_REQUESTS: "api-v1-item-requests",
} as const;
