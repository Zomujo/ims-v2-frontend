import { getItemCategoriesNoPaginate } from "@features/shared/actions/item-categories.actions";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { ItemCategoryResponse } from "@features/shared/types/action.types";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";

/**
 * Hook to fetch and manage categories.
 * It leverages useFetchData to provide robust caching and offline support.
 */
export function useCategories() {
  const { hasPermission } = useSessionData();
  const canFetch = hasPermission(PermissionModules.ITEMS_CATEGORIES);

  const { data, loading, error, refetch } = useFetchData<
    ItemCategoryResponse[]
  >({
    fetchFn: getItemCategoriesNoPaginate,
    cacheKey: CacheKey.ItemsCategoriesNoPaginate,
    executeOnMount: canFetch,
    deps: [canFetch],
  });

  return {
    categories: data ?? [],
    loading: loading && canFetch,
    error,
    refetch,
  };
}
