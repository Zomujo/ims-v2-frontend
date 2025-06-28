import { useEffect, useState } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { getDepartmentsNoPaginate } from "@features/shared/actions/admin.actions";
import { Department } from "@features/shared/types/settings-action.types";

/**
 * Hook to fetch and manage departments.
 * It fetches departments once and caches the result for any component that needs it.
 */
export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { hasPermission } = useSessionData();

  useEffect(() => {
    if (!hasPermission(PermissionModules.DEPARTMENTS)) return;
    if (!useDepartments.cache) {
      setLoading(true);
      getDepartmentsNoPaginate()
        .then((departmentsData) => {
          setDepartments(departmentsData);
          useDepartments.cache = departmentsData;
        })
        .catch((err) => {
          setError(err);
          console.error("Failed to fetch departments:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDepartments(useDepartments.cache);
    }
  }, [hasPermission]);

  const refetch = async () => {
    if (!hasPermission(PermissionModules.DEPARTMENTS)) return;
    setLoading(true);
    try {
      const departmentsData = await getDepartmentsNoPaginate();
      setDepartments(departmentsData);
      useDepartments.cache = departmentsData;
      return departmentsData;
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch departments:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { departments, loading, error, refetch };
}

useDepartments.cache = null as Department[] | null;
