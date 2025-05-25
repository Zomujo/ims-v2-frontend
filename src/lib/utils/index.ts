import { AuthApiStandardResponse } from "@/features/shared/types/auth-action.types";
import {
  CrudAction,
  GenerateQueryParams,
  HandleRequestState,
} from "@/features/shared/types/utitls.types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormWatch } from "react-hook-form";

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
    try {
      return JSON.parse(error.message) as AuthApiStandardResponse;
    } catch (error) {
      console.error("Error parsing error message", error);
      return { message: "Something went wrong" };
    }
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
}: HandleRequestState) => {
  toast.promise(res, {
    loading: loadingMsg ?? "Loading...",
    success: (data) => successMsg ?? (data.message as string),
    error: (error) => {
      return errorMsg ?? apiErrorResponse(error).message;
    },
    dismissible: true,
  });
};

export const generateQueryParams = (params: GenerateQueryParams = {}) => {
  return (Object.keys(params) as Array<keyof GenerateQueryParams>)
    .filter((key) => params[key])
    .map((key) => key + "=" + params[key])
    .join("&");
};

export const generateUrlWithQueryParams = (
  baseUrl: string,
  params: GenerateQueryParams,
  arrayParams?: string,
) => {
  const searchParams = new URLSearchParams();

  (Object.keys(params) as Array<keyof GenerateQueryParams>)
    .filter((key) => params[key])
    .forEach((key) => {
      searchParams.append(key as string, params[key] as string);
    });
  if (arrayParams) {
    const arraySearchParams = new URLSearchParams(arrayParams);
    arraySearchParams.forEach((value, key) => {
      searchParams.append(key, value);
    });
  }
  return baseUrl + "?" + searchParams.toString();
};

export const updateRouteHashFragment = (fragment: string | null) => {
  if (fragment) {
    window.location.hash = fragment;
  } else {
    window.location.hash = "";
  }
};

export const getStoredDataInQueryParam = ({
  action,
  value,
}: {
  action: CrudAction;
  value: string;
}) => {
  if (!value) return "";
  const fragmentIdentifier = `${action}-`;
  return value.replace(fragmentIdentifier, "");
};

export const formateCurrency = (ammount: string | number) => {
  return ammount?.toLocaleString("en-US", {
    style: "currency",
    currency: "GHC",
  });
};

export const formateDate = (date: string | number | Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const isStepValid = (
  stepFields: string[],
  formValues: UseFormWatch<FieldValues>,
): boolean => {
  return stepFields.every((field) => {
    const value = formValues[field as keyof typeof formValues];
    return value !== undefined && value !== null && value !== "";
  });
};

/**
 * Formats a value based on the specified type
 * @param value - The value to format (string or number)
 * @param type - The type of formatting to apply: 'number', 'percentage', or 'money'
 * @returns Formatted string representation of the value
 */
export function formatValue(
  value: string | number,
  type: "number" | "percentage" | "money",
): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return "—";
  }

  switch (type) {
    case "number":
      return formatNumberWithAbbreviation(numValue);

    case "percentage":
      return `${numValue}%`;

    case "money":
      return `GHC ${formatNumberWithAbbreviation(numValue)}`;

    default:
      return String(numValue);
  }
}

/**
 * Helper function to format numbers with k (thousands) and M (millions) abbreviations
 * @param value - The number to format
 * @returns Formatted string with appropriate abbreviation
 */
function formatNumberWithAbbreviation(value: number): string {
  const absValue = Math.abs(value);

  if (absValue >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return value.toString();
  }
}
