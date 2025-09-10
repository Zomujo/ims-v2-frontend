import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { IdData } from "@features/shared/types/action.types";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";
import { getSuppliersNoPaginate } from "@features/shared/actions/supplier.actions";

/**
 * Hook to fetch and manage items.
 * It leverages useFetchData to provide robust caching and offline support.
 */
export function useSuppliers() {
  const { hasPermission, isLoading: isSessionLoading } = useSessionData();
  const canFetch = hasPermission(PermissionModules.ITEMS_ORDERS);
  const shouldExecute = !isSessionLoading && canFetch;

  const { data, loading, error, refetch } = useFetchData<IdData[] | undefined>({
    fetchFn: getSuppliersNoPaginate,
    cacheKey: CacheKey.SuppliersNoPaginate,
    executeOnMount: shouldExecute,
    deps: [shouldExecute],
  });

  return {
    suppliers: data ?? [],
    loading: isSessionLoading || (shouldExecute && loading),
    error,
    refetch,
  };
}
