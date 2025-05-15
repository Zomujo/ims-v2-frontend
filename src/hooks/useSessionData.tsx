import { useSession } from "next-auth/react";

export const useSessionData = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const facilityName = session?.user?.facility?.name;

  const role = session?.user?.role;

  return {
    session,
    isLoading,
    isAuthenticated,
    facilityName,
    role,
  };
};
