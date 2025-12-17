import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { IdData } from "@features/shared/types/action.types";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";
import { getItemsNoPaginate } from "@features/shared/actions/items.actions";

/**
 * Hook to fetch and manage items.
 * It leverages useFetchData to provide robust caching and offline support.
 */
export function useItems() {
  const { hasPermission } = useSessionData();
  const canFetch = hasPermission(PermissionModules.ITEMS);

  const { data, loading, error, refetch } = useFetchData<IdData[] | undefined>({
    fetchFn: getItemsNoPaginate,
    cacheKey: CacheKey.ItemsNoPaginate,
    executeOnMount: canFetch,
    deps: [canFetch],
  });

  return {
    items: data ?? [],
    loading: canFetch && loading,
    error,
    refetch,
  };
}
