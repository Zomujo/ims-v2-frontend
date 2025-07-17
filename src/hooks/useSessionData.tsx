import { useSession } from "next-auth/react";
import {
  PermissionActions,
  PermissionModules,
  UserStatus,
} from "@features/shared/types/auth-action.types";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";

export const useSessionData = () => {
  const { data: session, status, update } = useSession();

  const user = session?.user;

  const userId = user?.id;

  const token = session?.user.tokens.accessToken;

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const fullName = user?.fullName;

  const firstName = fullName ? fullName.split(" ")[0] : "";

  const facilityName = user?.facility?.name;

  const role = user?.role;

  const profileImage = user?.imageUrl;
  const permissions = user?.permissions;
  const hasPermission = (permission: string) => {
    const permissionKeys = permissions?.map((item) => item.split(":")[0]);
    return !!permissionKeys?.includes(permission);
  };

  const hasActionPermission = (permissionToCheck: string) =>
    hasActionPermissionHelper(permissions, permissionToCheck);

  const canWrite = (module: PermissionModules) =>
    hasActionPermission(`${module}:${PermissionActions.WRITE}`);

  const canDelete = (module: PermissionModules) =>
    hasActionPermission(`${module}:${PermissionActions.DELETE}`);

  const updateUserStatus = async (userStatus: UserStatus) => {
    await update({
      status: userStatus,
    });
  };

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
    firstName,
    token,
    userId,
    updateUserStatus,
  };
};
