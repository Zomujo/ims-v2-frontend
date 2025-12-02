"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ImsSession } from "@features/shared/types/auth-action.types";
import {
  getImsSession,
  setImsSession,
  clearImsSession,
} from "@/lib/config/ims-session";

interface SessionContextType {
  session: ImsSession | null;
  isLoading: boolean;
  setSessionState: (session: ImsSession) => void;
  clearSession: () => void;
  clearSessionNoReload: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ImsSession | null>(() => {
    if (typeof window !== "undefined") {
      return getImsSession();
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure storage is fully initialized
    const timer = setTimeout(() => {
      const currentSession = getImsSession();
      setSession(currentSession);
      setIsLoading(false);
    }, 100);

    // Enable storage event listener for cross-tab synchronization
    const handler = () => {
      const updatedSession = getImsSession();
      console.log("Session updated from another tab:", updatedSession);
      setSession(updatedSession);
    };
    window.addEventListener("storage", handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setSessionState = useCallback((imsSession: ImsSession) => {
    setSession(imsSession);
    setIsLoading(false);
    setImsSession(imsSession);
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
    clearImsSession();
  }, []);

  const clearSessionNoReload = useCallback(() => {
    setSession(null);
    clearImsSession(false);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading,
        setSessionState,
        clearSession,
        clearSessionNoReload,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}
