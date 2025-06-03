"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { NotificationPayload } from "@/features/shared/types/notifications.types";
import { useSessionData } from "@/hooks/useSessionData";
import {
  fetchNotifications,
  markNotificationAsRead,
  markNotificationsAsRead,
} from "@features/shared/actions/notifications.actions";
import { toast } from "sonner";

interface GlobalNotificationsContextType {
  notifications: NotificationPayload[];
  unreadCount: number;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  refetch: () => void;
  clearNotifications: () => void;
}

const GlobalNotificationsContext =
  createContext<GlobalNotificationsContextType | null>(null);

interface GlobalNotificationsProviderProps {
  children: React.ReactNode;
  enableToasts?: boolean;
}

export function GlobalNotificationsProvider({
  children,
  enableToasts = true,
}: GlobalNotificationsProviderProps) {
  const { userId } = useSessionData();
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const initialLoadRef = useRef(false);

  const loadInitialNotifications = useCallback(async () => {
    if (!userId || initialLoadRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchNotifications();
      if (response.data) {
        setNotifications(response.data);
        initialLoadRef.current = true;
      } else {
        setError("Failed to load notifications");
      }
    } catch (err) {
      console.error("Error fetching initial notifications:", err);
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // SSE connection
  const connectSSE = useCallback(() => {
    if (!userId || !initialLoadRef.current) return;

    const url = `https://stealth-server-production.up.railway.app/api/v1/notifications/stream?user=${userId}`;

    try {
      eventSourceRef.current = new EventSource(url);

      eventSourceRef.current.onopen = () => {
        console.log("Global SSE connection opened for notifications");
        setIsConnected(true);
        setError(null);
      };

      eventSourceRef.current.onmessage = (event) => {
        try {
          const newNotification = JSON.parse(event.data) as NotificationPayload;

          setNotifications((prev) => {
            const exists = prev.some(({ id }) => id === newNotification.id);
            if (exists) return prev;

            return [newNotification, ...prev];
          });

          if (enableToasts) {
            toast.info(newNotification.message || "New notification", {
              description: newNotification.message,
              duration: 7000,
              position: "top-center",
            });
          }
        } catch (error) {
          console.error("Failed to parse notification:", error);
        }
      };

      eventSourceRef.current.onerror = (error) => {
        console.error("Global SSE connection error:", error);
        setIsConnected(false);
        setError("Connection lost");

        setTimeout(() => {
          if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
            connectSSE();
          }
        }, 5000);
      };
    } catch (error) {
      console.error("Failed to create global SSE connection:", error);
      setIsConnected(false);
      setError("Failed to connect");
    }
  }, [userId, enableToasts]);

  useEffect(() => {
    if (!userId) return;
    loadInitialNotifications();
  }, [userId, loadInitialNotifications]);

  useEffect(() => {
    if (initialLoadRef.current && !isLoading) {
      connectSSE();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [connectSSE, isLoading]);

  const markAllAsRead = useCallback(() => {
    void markNotificationsAsRead();
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        status: "READ" as const,
      })),
    );
  }, []);

  const markAsRead = useCallback((id: string) => {
    void markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: "READ" as const }
          : notification,
      ),
    );
  }, []);

  const refetch = useCallback(async () => {
    initialLoadRef.current = false;
    await loadInitialNotifications();
  }, [loadInitialNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(
    ({ status }) => status === "UNREAD",
  ).length;

  const value: GlobalNotificationsContextType = {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    error,
    markAllAsRead,
    markAsRead,
    refetch,
    clearNotifications,
  };

  return (
    <GlobalNotificationsContext.Provider value={value}>
      {children}
    </GlobalNotificationsContext.Provider>
  );
}

export function useGlobalNotifications() {
  const context = useContext(GlobalNotificationsContext);
  if (!context) {
    throw new Error(
      "useGlobalNotifications must be used within a GlobalNotificationsProvider",
    );
  }
  return context;
}
