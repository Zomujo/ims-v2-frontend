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
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ImsSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialSession = getImsSession();
    setSession(initialSession);
    setIsLoading(false);

    // Enable storage event listener for cross-tab synchronization
    const handler = () => {
      const updatedSession = getImsSession();
      setSession(updatedSession);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
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

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading,
        setSessionState,
        clearSession,
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
