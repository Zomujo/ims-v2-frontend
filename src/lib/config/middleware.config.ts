import { AuthIMSUser } from "@/features/shared/types/auth-action.types";
import { NextResponse } from "next/server";
import { AUTH_PAGE_ROUTES } from "../constant";

export const getUserStatusFromToken = (token: AuthIMSUser) => {
  return token.status;
};
export const redirectPendingUsers = (url: string) => {
  return NextResponse.redirect(new URL(AUTH_PAGE_ROUTES.RESET_PASSWORD, url));
};
export const redirectUsersWithoutTokenBackToLogin = (url: string) => {
  return NextResponse.redirect(new URL(AUTH_PAGE_ROUTES.LOG_IN, url));
};
