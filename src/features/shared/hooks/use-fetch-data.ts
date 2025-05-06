import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GenerateQueryParams } from "../types/utitls.types";

type FetchDataProps<T> = {
  fetchFn: (searchParams?: GenerateQueryParams) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
  onComplete?: () => void;
  deps?: unknown[];
  exercuteOnMount?: boolean;
};

export default function useFetchData<T>({
  fetchFn,
  onComplete,
  onError,
  onLoading,
  onSuccess,
  deps = [],
  exercuteOnMount = true,
}: FetchDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!exercuteOnMount) return;
    const fetchData = async () => {
      const queryParams = Object.fromEntries(searchParams.entries());
      try {
        setLoading(true);
        onLoading?.(true);
        const response = await fetchFn(queryParams);
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

    fetchData();
  }, [searchParams, ...deps]);
  return { data, loading, error };
}
