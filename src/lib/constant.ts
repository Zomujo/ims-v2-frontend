import { PermissionModules } from "@/features/shared/types/auth-action.types";

export const API_ENDPOINTS_OLD = {
  LOGIN: "/auth/login",
  CREATE_ACCOUNT: "/auth/signup",
  REFRESH_TOKEN: "/auth/refresh?token=",
  FORGOT_PASSWORD: {
    SEND_MAIL: "/auth/forgot-password/send-mail",
    VERIFY_TOKEN: "/auth/forgot-password/validate-code",
    RESET_PASSWORD: "/auth/forgot-password/reset",
  },
  CHANGE_PASSWORD: "/auth/change-password",
  USER_PROFILE: "/auth/user",
  CHANGE_EMAIL: {
    SEND_MAIL: "/auth/change-email/send-mail",
    VERIFY_OTP: "/auth/change-email/validate-otp",
  },
  CHANGE_ACCOUNT_INFO: "/auth/",
  UPLOAD_PROFILE_PICTURE: "/auth/profile-picture",
  DEPARTMENTS: "/departments",
  ADMIN: {
    USERS: "/admin/users",
    USER: "/admin/user",
    DEACTIVATE_USER: "/admin/users/[id]/deactivate",
    ACTIVATE_USER: "/admin/users/[id]/activate",
    UPDATE_USER_ROLE: "/admin/users/[id]/role",
    ROLES: "/admin/roles",
  },
  SALES: "/sales",
  SALES_ITEMS: "/sales/items",
  PATIENTS: "/patients",
};

export const AUTH_PAGE_ROUTES = {
  LOG_IN: "/auth/login",
  CREATE_ACCOUNT: "/auth/create-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD_VERIFY: "/auth/forgot-password/verify-code",
} as const;

export const PAGE_ROUTES = {
  DASHBOARD: "/dashboard",
  SETTINGS: {
    GENERAL: "/settings/general",
    SECURITY: "/settings/security",
    NOTIFICATIONS: "/settings/notifications",
    DEPARTMENTS: "/settings/departments",
    USERS: "/settings/users",
  },
  SALES: {
    VIEW: "/sales",
    RECORD: "/sales/record",
  },
  ITEMS: {
    VIEW: "/items",
    CREATE: "?state=create",
    BATCHES: "/items/:itemId/batches",
  },
  ITEM_BATCHES: "/batches",
  SUPPLIERS: {
    VIEW: "/suppliers",
    CREATE: "?state=create",
  },
  CATEGORIES: {
    VIEW: "/categories",
    CREATE: "?state=create",
  },
  STOCK_ADJUSTMENT: {
    VIEW: "/stock-adjustment",
    CREATE: "?state=create",
  },
  ITEM_ORDERS: {
    VIEW: "/item-orders",
    CREATE: "?state=create",
  },
  DEPARTMENTS_REQUESTS: {
    VIEW: "/department-requests",
    CREATE: "?state=create",
  },
  REPORTS: "/reports",
};

export const ACCESS_LEVELS = ["READ", "READ_WRITE", "READ_WRITE_DELETE"];
export const PERMISION_MODULES: (keyof typeof PermissionModules)[] = [
  "ITEMS",
  "SUPPLIERS",
  "SALES",
  "REPORTS",
  "ITEMS_CATEGORIES",
  "ITEMS_ORDERS",
  "STOCK_ADJUSTMENT",
  "DEPARTMENTS",
  "DEPARTMENT_REQUESTS",
  "USERS",
];
export const UI_STATE = "state";

export const featureOptions = [
  {
    label: "Items",
    value: PermissionModules.ITEMS,
  },
  {
    label: "Items Categories",
    value: PermissionModules.ITEMS_CATEGORIES,
  },
  {
    label: "Suppliers",
    value: PermissionModules.SUPPLIERS,
  },
  {
    label: "Reports",
    value: PermissionModules.REPORTS,
  },

  {
    label: "Stock Adjustments",
    value: PermissionModules.STOCK_ADJUSTMENT,
  },
  {
    label: "Departments",
    value: PermissionModules.DEPARTMENTS,
  },
  {
    label: "Departments Requests",
    value: PermissionModules.DEPARTMENT_REQUESTS,
  },
];

export const TESTIMONIALS = [
  {
    name: "Michael Mensah",
    position: "Chief Medical Officer / Korle-Bu",
    image: "/images/micheal.svg",
    message:
      "IMS has completely transformed how we manage our patient records. It’s user-friendly, reliable, and has made our operations more efficient than ever before.",
  },
  {
    name: "Elsie Osei",
    position: "Chief Financial Officer / Justab Hospital",
    image: "/images/elsie.svg",
    message:
      "Since adopting IMS, our clinic workflow has improved drastically. We can now focus more on patient care rather than paperwork. Highly recommended!",
  },
  {
    name: "Layla Keitting",
    position: "Chief Executive Officer / St. Joseph's Hospital",
    image: "/images/layla.svg",
    message:
      "The integration and onboarding process with IMS was seamless. The support team is outstanding, and the product delivers everything it promises.",
  },
];

export const FAQs = [
  {
    question: "What is IMS and who is it for?",
    answer:
      "IMS (Inventory Medical System) is a software platform designed to streamline operations for healthcare providers, including hospitals, clinics, and pharmacies. It helps with patient management, records, billing, and inventory tracking.",
  },
  {
    question: "Can I access IMS from multiple devices?",
    answer:
      "Yes, IMS is cloud-based and can be accessed from any internet-enabled device. This allows doctors, nurses, and administrators to collaborate in real time.",
  },
  {
    question: "Is my data secure with IMS?",
    answer:
      "Absolutely. IMS uses industry-standard encryption protocols and regular backups to ensure all patient and facility data remains secure and compliant with healthcare regulations.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Yes, you can switch between Standard and Premium plans at any time. Just contact our support team or use the billing dashboard in your admin panel.",
  },
  {
    question: "Does IMS provide support and training?",
    answer:
      "Yes, we offer onboarding sessions, tutorials, and 24/7 support to ensure your team is fully equipped to use the platform effectively.",
  },
];
