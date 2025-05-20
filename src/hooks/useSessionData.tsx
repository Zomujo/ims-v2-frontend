import { useSession } from "next-auth/react";

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
    if (!permissions) {
      return false;
    }
    const permissionKeys = user.permissions.map((item) => item.split(":")[0]);
    return permissionKeys.includes(permission);
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
  };
};
