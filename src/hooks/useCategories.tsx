import { useEffect, useState } from "react";
import { ItemCategoryResponse } from "@features/shared/types/action.types";
import { getItemCategoriesNoPaginate } from "@features/shared/actions/item-categories.actions";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";

/**
 * Hook to fetch and manage categories.
 * It fetches categories once and caches the result for any component that needs it.
 */
export function useCategories() {
  const [categories, setCategories] = useState<ItemCategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { hasPermission } = useSessionData();

  useEffect(() => {
    if (!hasPermission(PermissionModules.ITEMS_CATEGORIES)) return;
    if (!useCategories.cache) {
      setLoading(true);
      getItemCategoriesNoPaginate()
        .then((categoriesData) => {
          setCategories(categoriesData);
          useCategories.cache = categoriesData;
        })
        .catch((err) => {
          setError(err);
          console.error("Failed to fetch categories:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCategories(useCategories.cache);
    }
  }, []);

  const refetch = async () => {
    if (!hasPermission(PermissionModules.ITEMS_CATEGORIES)) return;
    setLoading(true);
    try {
      const categoriesData = await getItemCategoriesNoPaginate();
      setCategories(categoriesData);
      useCategories.cache = categoriesData;
      return categoriesData;
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch categories:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch };
}

useCategories.cache = null as ItemCategoryResponse[] | null;
