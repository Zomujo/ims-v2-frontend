import { useSession } from "next-auth/react";
import {
  PermissionActions,
  PermissionModules,
} from "@features/shared/types/auth-action.types";

export const useSessionData = () => {
  const { data: session, status } = useSession();

  const user = session?.user;

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const fullName = user?.fullName;

  const facilityName = user?.facility?.name;

  const role = user?.role;

  const profileImage = user?.imageUrl;

  const permissions = user?.permissions;

  const hasPermission = (permission: string) => {
    const permissionKeys = permissions?.map((item) => item.split(":")[0]);
    return !!permissionKeys?.includes(permission);
  };

  const hasActionPermission = (permissionToCheck: string) => {
    if (!permissions) return false;

    const [resource, actionToCheck] = permissionToCheck.split(":");

    const matchingPermission = permissions.find((p) =>
      p.startsWith(`${resource}:`),
    );

    if (!matchingPermission) return false;

    const [, actions] = matchingPermission.split(":");

    return actions.includes(actionToCheck);
  };

  const canWrite = (module: PermissionModules) =>
    hasActionPermission(`${module}:${PermissionActions.WRITE}`);

  const canDelete = (module: PermissionModules) =>
    hasActionPermission(`${module}:${PermissionActions.DELETE}`);

  return {
    session,
    isLoading,
    isAuthenticated,
    facilityName,
    role,
    profileImage,
    fullName,
    permissions,
    hasPermission,
    hasActionPermission,
    canWrite,
    canDelete,
  };
};
