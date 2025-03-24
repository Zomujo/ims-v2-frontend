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
    VERIFY_OTP: "/auth/change-email/validate-otp",
  },
  CHANGE_ACCOUNT_INFO: "/auth/",
  UPLOAD_PROFILE_PICTURE: "/auth/profile-picture",
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
  },
};
