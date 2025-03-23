import { AuthApiStandardResponse } from "@/features/shared/types/auth-action.types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const apiErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    return JSON.parse(error.message) as AuthApiStandardResponse;
  }
  return { message: "Something went wrong" };
};

export const getInitials = (fullName: string): string => {
  const names = fullName?.split(" ");
  const firstInitial = names[0]?.charAt(0) ?? "";
  const lastInitial = names[names.length - 1]?.charAt(0) ?? "";
  return (firstInitial + lastInitial).toUpperCase();
};

export const handleRequestState = ({
  loadingMsg,
  successMsg,
  errorMsg,
  res,
}: {
  loadingMsg?: string;
  successMsg?: string;
  errorMsg?: string;
  res: Promise<Record<string, unknown>>;
}) => {
  toast.promise(res, {
    loading: loadingMsg ?? "Loading...",
    success: (data) => successMsg ?? (data.message as string),
    error: (error) => {
      return errorMsg ?? apiErrorResponse(error).message;
    },
  });
};
