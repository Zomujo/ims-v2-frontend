"use client";
import {
  PermissionActions,
  PermissionModules,
  UserStatus,
} from "@features/shared/types/auth-action.types";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";
import { useCallback, useMemo } from "react";
import { useSessionContext } from "@/lib/providers/session-provider";

export const useSessionData = () => {
  const { session, isLoading, setSessionState } = useSessionContext();

  const userId = session?.id;
  const token = session?.tokens.accessToken;

  const isAuthenticated = useMemo(() => !!session, [session]);

  const fullName = session?.fullName;
  const firstName = fullName ? fullName.split(" ")[0] : "";
  const facilityName = session?.facility?.name;
  const role = session?.role;
  const profileImage = session?.imageUrl;
  const permissions = session?.permissions;
  const email = session?.email;
  const phoneNumber = session?.phoneNumber;

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

  const updateUserStatus = useCallback(
    (status: UserStatus) => {
      if (session) {
        const updatedSession = { ...session, status };
        setSessionState(updatedSession);
      }
    },
    [session, setSessionState],
  );

  return {
    session,
    isAuthenticated,
    isLoading,
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
    email,
    token,
    userId,
    phoneNumber,
    updateUserStatus,
    setSessionState,
  };
};
