"use server";
import { cookies, headers } from "next/headers";
import {
  getImsSession,
  PERMISSION_KEY,
  SESSION_KEY,
} from "@/lib/config/ims-session";

function parseCookies(cookieString: string): Record<string, string> {
  return cookieString.split(";").reduce(
    (acc, cookie) => {
      const [key, ...val] = cookie.trim().split("=");
      acc[key] = decodeURIComponent(val.join("="));
      return acc;
    },
    {} as Record<string, string>,
  );
}

export async function imsServerSession(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return getImsSession()?.id ?? null;
  }
  let cookieString: string;
  try {
    const headerList = await headers();
    cookieString = headerList.get("cookie") || "";
  } catch {
    cookieString = String(await cookies?.());
  }
  const parsed = parseCookies(cookieString);
  const token = parsed[`${SESSION_KEY}`];
  if (!token) return null;

  return token;
}

export async function imsServerPermissions(): Promise<string[] | null> {
  if (typeof window !== "undefined") {
    return getImsSession()?.permissions ?? null;
  }
  let cookieString: string;
  try {
    const headerList = await headers();
    cookieString = headerList.get("cookie") || "";
  } catch {
    cookieString = String(await cookies?.());
  }
  const parsed = parseCookies(cookieString);
  const permissions = parsed[PERMISSION_KEY];
  if (!permissions) {
    return null;
  }

  try {
    const parsedPermissions = JSON.parse(decodeURIComponent(permissions));
    if (Array.isArray(parsedPermissions)) {
      return parsedPermissions;
    }
    return null;
  } catch {
    return null;
  }
}
