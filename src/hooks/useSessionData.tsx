"use client";
import {
  ImsSession,
  PermissionActions,
  PermissionModules,
  UserStatus,
} from "@features/shared/types/auth-action.types";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";
import { useState, useEffect, useCallback, useMemo } from "react";
import { getImsSession, setImsSession } from "@/lib/config/ims-session";

export const useSessionData = () => {
  const [session, setSession] = useState<ImsSession | null>(getImsSession());

  useEffect(() => {
    const handler = () => {
      setSession(getImsSession());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const setSessionState = useCallback((imsSession: ImsSession) => {
    setImsSession(imsSession);
    setSession(session);
  }, []);

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

  const updateUserStatus = (status: UserStatus) => {
    if (session) {
      const updatedSession = { ...session, status };
      setSessionState(updatedSession);
    }
  };

  return {
    session,
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
    email,
    token,
    userId,
    phoneNumber,
    updateUserStatus,
  };
};
