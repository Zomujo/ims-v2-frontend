import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GenerateQueryParams } from "../types/utitls.types";

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
  exercuteOnMount?: boolean;
  arrayQueries?: string[];
};

export default function useFetchData<T>({
  fetchFn,
  onComplete,
  onError,
  onLoading,
  onSuccess,
  deps = [],
  exercuteOnMount = true,
  arrayQueries = [],
}: FetchDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const searchParams = useSearchParams();

  const fetchData = async () => {
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
    } catch (err) {
      setError(err as Error);
      onError?.(err as Error);
    } finally {
      setLoading(false);
      onLoading?.(false);
      onComplete?.();
    }
  };

  useEffect(() => {
    if (!exercuteOnMount) return;
    void fetchData();
  }, [searchParams, ...deps]);

  const refetch = () => {
    void fetchData();
  };
  return { data, loading, error, refetch };
}
