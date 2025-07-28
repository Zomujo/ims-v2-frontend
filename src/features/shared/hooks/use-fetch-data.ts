import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GenerateQueryParams } from "../types/utitls.types";
import localforage from "localforage";

type FetchDataProps<T> = {
  fetchFn: (
    searchParams?: GenerateQueryParams,
    arraySearch?: string,
  ) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  onComplete?: () => void;
  deps?: unknown[];
  executeOnMount?: boolean;
  arrayQueries?: string[];
  cacheKey?: string;
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
  cacheKey,
}: FetchDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const searchParams = useSearchParams();
  const prevSearchParams = useRef<string>("");

  const fetchData = async () => {
    const fullCacheKey = cacheKey
      ? `${cacheKey}:${searchParams.toString()}`
      : null;

    let cachedData: T | null = null;

    if (fullCacheKey) {
      cachedData = await localforage.getItem<T>(fullCacheKey);
      if (cachedData) {
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
    try {
      setLoading(true);
      onLoading?.(true);
      const response = await fetchFn(
        filteredQueryParams,
        arraySearchParams.toString(),
      );
      setData(response);
      onSuccess?.(response);
      if (fullCacheKey) {
        await localforage.setItem(fullCacheKey, response);
      }
    } catch (err) {
      const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
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
