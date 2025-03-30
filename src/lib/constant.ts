import { PermissionModules } from "@/features/shared/types/auth-action.types";

export const API_ENDPOINTS = {
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
    VERIFY_OTP: "/a3uth/change-email/validate-otp",
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
};

export const AUTH_PAGE_ROUTES = {
  LOG_IN: "/auth/login",
  CREATE_ACCOUNT: "/auth/create-account",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  FORGOT_PASSWORD_VERIFY: "/auth/forgot-password/verify-code",
};

export const PAGE_ROUTES = {
  DASHBOARD: "/dashboard",
  SETTINGS: {
    GENERAL: "/settings/general",
    SECURITY: "/settings/security",
    NOTIFICATIONS: "/settings/notifications",
    DEPARTMENTS: "/settings/departments",
    USERS: "/settings/users",
  },
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
