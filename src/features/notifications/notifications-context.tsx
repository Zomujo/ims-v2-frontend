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
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";

interface GlobalNotificationsContextType {
  notifications: NotificationPayload[];
  unreadCount: number;
  isConnected: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  refetch: () => void;
  clearNotifications: () => void;
  loadMore: () => void;
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
  const [isConnected, setIsConnected] = useState(
    typeof navigator !== "undefined" && navigator.onLine,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const eventSourceRef = useRef<EventSource | null>(null);
  const initialLoadRef = useRef(false);
  const notificationIdsRef = useRef<Set<string>>(new Set());

  const addNotificationsNoDuplicates = useCallback(
    (
      newNotifications: NotificationPayload[],
      mode: "append" | "prepend" = "append",
    ) => {
      const uniqueNotifications = newNotifications.filter(
        (notification) => !notificationIdsRef.current.has(notification.id),
      );

      if (uniqueNotifications.length > 0) {
        uniqueNotifications.forEach((notification) =>
          notificationIdsRef.current.add(notification.id),
        );

        if (mode === "prepend") {
          setNotifications((prev) => [...uniqueNotifications, ...prev]);
        } else {
          setNotifications((prev) => [...prev, ...uniqueNotifications]);
        }
        void localforage.setItem(CacheKey.Notifications, notifications);
      }

      return uniqueNotifications.length;
    },
    [],
  );

  const loadInitialNotifications = useCallback(async () => {
    if (!userId || initialLoadRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchNotifications(1);
      const notificationsData = response.data?.rows;
      if (notificationsData) {
        setNotifications([]);
        notificationIdsRef.current.clear();

        addNotificationsNoDuplicates(notificationsData);
        setCurrentPage(1);
        setHasMore(
          notificationsData.length > 0 && (response.data?.totalPages ?? 0) > 1,
        );

        initialLoadRef.current = true;
      } else {
        setError("Failed to load notifications");
      }
    } catch (err) {
      if (!isConnected) {
        const cachedNotifications = await localforage.getItem<
          NotificationPayload[]
        >(CacheKey.Notifications);
        if (cachedNotifications) {
          setNotifications(notifications);
          notificationIdsRef.current = new Set(notifications.map((n) => n.id));
          return;
        } else {
          console.error("Error fetching initial notifications:", err);
          setError("Failed to load notifications");
        }
      } else {
        console.error("Error fetching initial notifications:", err);
        setError("Failed to load notifications");
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, addNotificationsNoDuplicates, isConnected]);

  const loadMore = useCallback(async () => {
    if (!userId || isLoading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      const response = await fetchNotifications(nextPage);

      if (response.data?.rows) {
        addNotificationsNoDuplicates(response.data.rows);
        setCurrentPage(nextPage);
        setHasMore(nextPage < response.data.totalPages);
      }
    } catch (err) {
      console.error("Error loading more notifications:", err);
      setError("Failed to load more notifications");
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    userId,
    currentPage,
    hasMore,
    isLoading,
    isLoadingMore,
    addNotificationsNoDuplicates,
  ]);

  // SSE connection
  const connectSSE = useCallback(() => {
    if (!userId || !initialLoadRef.current) return;

    const url = `${process.env.NEXT_PUBLIC_IMS_API_URL}/notifications/stream?user=${userId}`;

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

          const addedCount = addNotificationsNoDuplicates(
            [newNotification],
            "prepend",
          );

          if (addedCount > 0) {
            console.log("New notification added via SSE:", newNotification.id);

            if (enableToasts) {
              toast.info("New notification", {
                description: newNotification.message,
                duration: 7000,
                position: "top-center",
              });
            }
          } else {
            console.log("Duplicate notification ignored:", newNotification.id);
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
    void loadInitialNotifications();
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
    setCurrentPage(1);
    setHasMore(true);
    await loadInitialNotifications();
  }, [loadInitialNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    notificationIdsRef.current.clear();
  }, []);

  const unreadCount = notifications.filter(
    ({ status }) => status === "UNREAD",
  ).length;

  const value: GlobalNotificationsContextType = {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    markAllAsRead,
    markAsRead,
    refetch,
    clearNotifications,
    loadMore,
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
