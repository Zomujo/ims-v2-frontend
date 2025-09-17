import { useEffect, useState } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import {
  AuthIMSUserProfile,
  PermissionModules,
} from "@features/shared/types/auth-action.types";
import { getUsersNoPaginate } from "@features/shared/actions/admin.actions";

/**
 * Hook to fetch and manage users.
 * It fetches users once and caches the result for any component that needs it.
 */

// Module-level cache for users
let usersCache: AuthIMSUserProfile[] | null = null;

export function useUsers() {
  const [users, setUsers] = useState<AuthIMSUserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { hasPermission } = useSessionData();

  useEffect(() => {
    if (!hasPermission(PermissionModules.USERS)) return;
    if (!usersCache) {
      setLoading(true);
      getUsersNoPaginate()
        .then((usersData) => {
          setUsers(usersData);
          usersCache = usersData;
        })
        .catch((err) => {
          setError(err);
          console.error("Failed to fetch users:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUsers(usersCache);
    }
  }, [hasPermission]);

  const refetch = async () => {
    if (!hasPermission(PermissionModules.USERS)) return;
    setLoading(true);
    try {
      const usersData = await getUsersNoPaginate();
      setUsers(usersData);
      usersCache = usersData;
      return usersData;
    } catch (err) {
      setError(err as Error);
      console.error("Failed to fetch users:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, refetch };
}
