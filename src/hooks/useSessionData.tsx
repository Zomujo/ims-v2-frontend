import { useSession } from "next-auth/react";
import {
  PermissionActions,
  PermissionModules,
  UserStatus,
} from "@features/shared/types/auth-action.types";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";
import { useState, useEffect } from "react";
import localforage from "localforage";
import { Session } from "next-auth";

localforage.config({
  name: "zomujo-stealth-db",
});

export const useSessionData = () => {
  const { data: networkSession, status, update } = useSession();
  const [cachedSession, setCachedSession] = useState<Session | null>(null);

  useEffect(() => {
    if (networkSession) {
      if (JSON.stringify(networkSession) !== JSON.stringify(cachedSession)) {
        setCachedSession(networkSession);
        void localforage.setItem("session", networkSession);
      }
    }
  }, [networkSession, cachedSession]);

  useEffect(() => {
    const loadCachedSession = async () => {
      if (status !== "loading" && !networkSession) {
        const savedSession = await localforage.getItem<Session>("session");
        if (savedSession) {
          setCachedSession(savedSession);
        }
      }
    };
    void loadCachedSession();
  }, [status, networkSession]);

  const session = networkSession || cachedSession;

  const user = session?.user;
  const userId = user?.id;
  const token = session?.user.tokens.accessToken;

  const isLoading = status === "loading" && !cachedSession;
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
    if (networkSession) {
      await update({
        status: userStatus,
      });
    } else {
      console.log("Cannot update status while offline.");
    }
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
