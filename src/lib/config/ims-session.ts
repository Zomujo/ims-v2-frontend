import { ImsSession } from "@features/shared/types/auth-action.types";

export const SESSION_KEY = "ims_session_token";

export const PERMISSION_KEY = "ims_permissions";

export function getImsSession(): ImsSession | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  return session ? (JSON.parse(session) as ImsSession) : null;
}

export function setImsSession(session: ImsSession) {
  if (typeof window === "undefined") return;

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);
  const expiresString = `expires=${expires.toUTCString()}`;

  document.cookie = `${SESSION_KEY}=${session.id}; path=/; ${expiresString}`;
  document.cookie = `${PERMISSION_KEY}=${encodeURIComponent(
    JSON.stringify(session.permissions),
  )}; path=/; ${expiresString}`;
}

export function clearImsSession(reload = true) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  document.cookie = `${SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  if (reload) {
    window.location.reload();
  }
}
