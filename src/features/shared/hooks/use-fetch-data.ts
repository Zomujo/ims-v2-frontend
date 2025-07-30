import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GenerateQueryParams } from "../types/utitls.types";
import localforage from "localforage";
import { useGlobalNotifications } from "@features/notifications/notifications-context";

type FetchDataProps<T> = {
  fetchFn: (
    searchParams?: GenerateQueryParams,
    arraySearch?: string,
    routeParams?: Record<string, string>,
  ) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  onComplete?: () => void;
  deps?: unknown[];
  executeOnMount?: boolean;
  arrayQueries?: string[];
  routeParams?: Record<string, string>;
  cacheKey?: string;
  searchField?: string;
};

export default function useFetchData<T>({
  fetchFn,
  onComplete,
  onError,
  onLoading,
  onSuccess,
  deps = [],
  executeOnMount = true,
  arrayQueries = [],
  routeParams,
  cacheKey,
  searchField,
}: FetchDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [coldData, setColdData] = useState<T | null>(null);
  const [data, setData] = useState<T | null>(null);
  const searchParams = useSearchParams();
  const prevSearchParams = useRef<string>("");
  const { isConnected } = useGlobalNotifications();

  const fetchData = async () => {
    let cachedData: T | null = null;

    if (cacheKey) {
      cachedData = await localforage.getItem<T>(cacheKey);
      if (cachedData) {
        if (
          typeof cachedData === "object" &&
          "total" in cachedData &&
          "totalPages" in cachedData
        ) {
          cachedData = {
            ...cachedData,
            totalPages: Math.ceil(Number(cachedData.total) / 10),
          } as T;
        }
        setColdData(cachedData);
        setData(cachedData);
      }
    }

    const queryParams = Object.fromEntries(searchParams.entries());
    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([key]) => !arrayQueries.includes(key),
      ),
    );
    const arraySearchParams = new URLSearchParams();
    arrayQueries.forEach((key) => {
      searchParams.getAll(key).forEach((value) => {
        arraySearchParams.append(key, value);
      });
    });
    const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
    if (isOffline || !isConnected) {
      if (
        coldData &&
        typeof coldData === "object" &&
        "rows" in coldData &&
        Array.isArray(coldData.rows)
      ) {
        const filteredResults = coldData.rows.filter((item) =>
          Object.entries(queryParams).every(([key, value]) => {
            if (["page", "limit", "state", ...arrayQueries].includes(key)) {
              return true;
            }
            if (!value) {
              return true;
            }
            if (key === "search") {
              if (
                searchField &&
                item.hasOwnProperty(searchField) &&
                item[searchField] != null
              ) {
                return String(item[searchField])
                  .toLowerCase()
                  .includes(String(value).toLowerCase());
              }
              return true;
            }

            if (item.hasOwnProperty(key) && item[key] != null) {
              return String(item[key])
                .toLowerCase()
                .includes(String(value).toLowerCase());
            }
            return false;
          }),
        );
        setData({
          ...(coldData as object),
          rows: filteredResults,
          total: filteredResults.length,
          totalPages: Math.ceil(
            filteredResults.length / Number(queryParams.limit || 10),
          ),
        } as T);
      }

      return;
    }
    try {
      setLoading(true);
      onLoading?.(true);
      const response = await fetchFn(
        filteredQueryParams,
        arraySearchParams.toString(),
        routeParams,
      );
      setColdData(response);
      setData(response);
      onSuccess?.(response);
      if (cacheKey && response) {
        if (
          cachedData &&
          typeof cachedData === "object" &&
          typeof response === "object" &&
          "rows" in cachedData &&
          "rows" in response &&
          Array.isArray(cachedData.rows) &&
          Array.isArray(response.rows)
        ) {
          if (cachedData.rows.length < response.rows.length) {
            await localforage.setItem(cacheKey, response);
          }
        } else {
          await localforage.setItem(cacheKey, response);
        }
      }
    } catch (err) {
      if (isOffline && cachedData) {
        // This is a graceful fallback to cache while offline, not an error.
        // We simply suppress the network error and let the user see the stale data.
        return;
      }
      setError(err as Error);
      onError?.(err as Error);
    } finally {
      setLoading(false);
      onLoading?.(false);
      onComplete?.();
    }
  };

  useEffect(() => {
    if (!executeOnMount) return;

    const newSearchParamsString = searchParams.toString();
    const oldSearchParamsString = prevSearchParams.current;
    prevSearchParams.current = newSearchParamsString;

    const state = searchParams.get("state");

    if (
      (state === "create" || state === "edit") &&
      oldSearchParamsString !== undefined
    ) {
      const newParamsCopy = new URLSearchParams(newSearchParamsString);
      const oldParamsCopy = new URLSearchParams(oldSearchParamsString);

      newParamsCopy.delete("state");
      oldParamsCopy.delete("state");

      if (newParamsCopy.toString() === oldParamsCopy.toString()) {
        return;
      }
    }

    void fetchData();
  }, [searchParams, ...deps]);

  const refetch = () => {
    void fetchData();
  };
  return { data, loading, error, refetch };
}
