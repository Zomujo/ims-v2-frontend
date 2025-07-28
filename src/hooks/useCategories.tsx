import { getItemCategoriesNoPaginate } from "@features/shared/actions/item-categories.actions";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { ItemCategoryResponse } from "@features/shared/types/action.types";
import useFetchData from "@features/shared/hooks/use-fetch-data";

/**
 * Hook to fetch and manage categories.
 * It leverages useFetchData to provide robust caching and offline support.
 */
export function useCategories() {
  const { hasPermission, isLoading: isSessionLoading } = useSessionData();
  const canFetch = hasPermission(PermissionModules.ITEMS_CATEGORIES);
  const shouldExecute = !isSessionLoading && canFetch;

  const { data, loading, error, refetch } = useFetchData<
    ItemCategoryResponse[]
  >({
    fetchFn: getItemCategoriesNoPaginate,
    cacheKey: "item-categories-no-paginate",
    executeOnMount: shouldExecute,
    deps: [shouldExecute],
  });

  return {
    categories: data ?? [],
    loading: isSessionLoading || (shouldExecute && loading),
    error,
    refetch,
  };
}
