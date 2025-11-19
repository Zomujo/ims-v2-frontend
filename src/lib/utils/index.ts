import { AuthApiStandardResponse } from "@/features/shared/types/auth-action.types";
import {
  CrudAction,
  GenerateQueryParams,
  HandleRequestState,
  WeekDay,
} from "@/features/shared/types/utitls.types";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormWatch } from "react-hook-form";
import { addDays, format, isSameMonth } from "date-fns";

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
  if (typeof error === "string") {
    return { message: error };
  }
  if (error instanceof Error) {
    try {
      return { message: error.message } as AuthApiStandardResponse;
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
  routeParams?: Record<string, string>,
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
  let url = baseUrl;

  if (routeParams) {
    Object.entries(routeParams).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }

  return url + "?" + searchParams.toString();
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

export const formatDateTime = (date: string | number | Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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

/**
 * Generates a distinct color based on an index
 * Uses the golden angle approximation for good distribution of colors
 * @param index - The index used to generate a unique color
 * @param avoidBlack
 * @param avoidWhite
 * @returns A hex color code
 */
export function generateColor(
  index: number,
  avoidBlack: boolean = false,
  avoidWhite: boolean = false,
): string {
  const hue = (index * 137) % 360;
  const saturation = 70;
  let lightness = 50;

  // Adjust lightness and saturation to avoid extremes
  if (avoidBlack && lightness < 20) lightness = 20;
  if (avoidWhite && lightness > 80) lightness = 80;

  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      let t1 = t;
      if (t1 < 0) t1 += 1;
      if (t1 > 1) t1 -= 1;
      if (t1 < 1 / 6) return p + (q - p) * 6 * t1;
      if (t1 < 1 / 2) return q;
      if (t1 < 2 / 3) return p + (q - p) * (2 / 3 - t1) * 6;
      return p;
    };

    const q1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p1 = 2 * l - q1;

    r = hue2rgb(p1, q1, h + 1 / 3);
    g = hue2rgb(p1, q1, h);
    b = hue2rgb(p1, q1, h - 1 / 3);
  }

  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts a date to a human-readable relative time string
 * @param date The date to convert
 * @returns A string representation of the relative time (e.g., "Now", "5 mins ago", "an hour ago")
 */
export function getRelativeTime(date: Date | string): string {
  const currentDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - currentDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "Now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"} ago`;
  }

  if (diffInHours < 24) {
    return diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;
  }

  if (diffInDays < 7) {
    return diffInDays === 1 ? "a day ago" : `${diffInDays} days ago`;
  }
  return currentDate.toLocaleDateString();
}

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const capitalize = (text: string): string =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export const camelCaseToSentence = (camelCaseStr: string): string => {
  return camelCaseStr
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase())
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

export const getAgeFromDate = (date: string | Date): number => {
  const year = new Date(date).getFullYear();
  const currentYear = new Date().getFullYear();
  return Math.abs(currentYear - year);
};

/**
 * Generates an array of 8 consecutive days starting from a given date.
 *
 * Each day includes the date object, a short weekday name, and a flag
 * indicating whether the date is part of the same month as the selected date.
 *
 * @param {Date} currentWeekStart - The starting date of the week (usually a Sunday or Monday).
 * @param {Date} selectedDate - The date used to determine the current month for comparison.
 * @returns {WeekDay[]} Array of day objects representing the week.
 */

export function generateWeekDays(
  currentWeekStart: Date,
  selectedDate: Date,
): WeekDay[] {
  const days: WeekDay[] = [];

  for (let i = 0; i < 8; i++) {
    const day = addDays(currentWeekStart, i);
    days.push({
      date: day,
      day: format(day, "EEE"),
      isCurrentMonth: isSameMonth(day, selectedDate),
    });
  }
  return days;
}

/*
 * Checks if the difference between the current time and the given date stamp exceeds the specified time limit in hours.
 * @param dateStamp - The date to compare against the current time.
 * @param timeLimitInHours - The time limit in hours to check the difference against. Defaults to 24 hours.
 * @returns `true` if the difference exceeds the time limit, otherwise `false`.
 */
export function timeDifferenceChecker(
  dateStamp: Date | string,
  timeLimitInHours = 24,
): boolean {
  const timeToCheck = new Date(dateStamp).getTime();
  const currentTime = new Date().getTime();
  const hoursDifference = Math.abs(currentTime - timeToCheck) / 36e5;
  return hoursDifference > timeLimitInHours;
}
