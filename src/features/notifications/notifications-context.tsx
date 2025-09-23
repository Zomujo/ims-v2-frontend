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
import { io, Socket } from "socket.io-client";
import { notificationEvents } from "@/lib/events/notification-events";

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
  const { userId, facilityId, departmentId } = useSessionData();
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [isConnected, setIsConnected] = useState(
    typeof navigator !== "undefined" && navigator.onLine,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const socketRef = useRef<Socket | null>(null);
  const initialLoadRef = useRef(false);
  const notificationIdsRef = useRef<Set<string>>(new Set());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const connectSocket = useCallback(() => {
    if (!facilityId || !initialLoadRef.current) return;

    const socketUrl = process.env.NEXT_PUBLIC_IMS_API_URL_BASE;

    try {
      socketRef.current = io(socketUrl!, {
        transports: ["websocket"],
        autoConnect: true,
      });

      socketRef.current.on("connect", () => {
        console.log("Global Socket.IO connection opened for notifications");
        setIsConnected(true);
        setError(null);

        const deptPart = departmentId ? `:${departmentId}:` : "";
        const topic = `${facilityId}${deptPart}`;
        socketRef.current?.emit("subscribe", { topic });
        console.log(`Subscribed to topic: ${topic}`);

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      });

      socketRef.current.on("notification.new", (data: NotificationPayload) => {
        try {
          const addedCount = addNotificationsNoDuplicates([data], "prepend");

          if (addedCount > 0) {
            console.log("New notification added via Socket.IO:", data.id);

            notificationEvents.emit();

            if (enableToasts) {
              toast.info("New notification", {
                description: data.message,
                duration: 7000,
                position: "top-center",
              });
            }
          } else {
            console.log("Duplicate notification ignored:", data.id);
          }
        } catch (error) {
          console.error("Failed to process notification:", error);
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("Global Socket.IO connection closed:", reason);
        setIsConnected(false);

        if (reason !== "io client disconnect" && !reconnectTimeoutRef.current) {
          setError("Connection lost");
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            socketRef.current?.connect();
          }, 5000);
        }
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Global Socket.IO connection error:", error);
        setIsConnected(false);
        setError("Connection error");
      });
    } catch (error) {
      console.error("Failed to create global Socket.IO connection:", error);
      setIsConnected(false);
      setError("Failed to connect");
    }
  }, [facilityId, departmentId, enableToasts, addNotificationsNoDuplicates]);

  useEffect(() => {
    if (!userId) return;
    void loadInitialNotifications();
  }, [userId, loadInitialNotifications]);

  useEffect(() => {
    if (initialLoadRef.current && !isLoading) {
      connectSocket();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectSocket, isLoading]);

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
