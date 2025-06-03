"use client";

import { JSX } from "react";
import { ImsButton } from "@features/shared/components/ims-button";
import { cn, getRelativeTime } from "@/lib/utils";
import { ImsAvatar } from "@features/shared/components/ims-avatar";
import Link from "next/link";
import { Wifi, WifiOff, Loader2, RefreshCw } from "lucide-react";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

export default function RealtimeNotifications(): JSX.Element {
  const {
    notifications,
    isConnected,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    markAllAsRead,
    markAsRead,
    refetch,
    loadMore,
  } = useGlobalNotifications();

  const { observerRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: loadMore,
    threshold: 100,
  });

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className="w-[470px] text-[#111111]">
      <div className="w-full px-6 pt-7 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Notification</span>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            ) : isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isLoading
                  ? "text-blue-600"
                  : isConnected
                    ? "text-green-600"
                    : "text-red-600",
              )}
            >
              {isLoading ? "Loading..." : isConnected ? "Live" : "Disconnected"}
            </span>
            {error && !isLoading && (
              <ImsButton
                variant="ghost"
                size="sm"
                onClick={handleRefetch}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="h-3 w-3" />
              </ImsButton>
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="font-bold">
            All{" "}
            <span className="bg-primary-light inline-block h-6 w-6 rounded-full text-center text-sm leading-6 font-medium">
              {notifications.length}
            </span>
          </span>
          <div className="space-x-4">
            <ImsButton
              className="text-base font-medium underline"
              variant="link"
              onClick={handleMarkAllAsRead}
              disabled={isLoading || notifications.length === 0}
            >
              Mark all as read
            </ImsButton>
          </div>
        </div>
      </div>
      <div className="max-h-[500px] overflow-y-auto font-normal">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <span>Loading notifications...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <span className="mb-2 text-red-500">{error}</span>
            <ImsButton variant="outline" size="sm" onClick={handleRefetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </ImsButton>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <span>No notifications yet</span>
          </div>
        ) : (
          <>
            {notifications.map(
              ({ message, id, createdAt, status, linkName, linkRoute }) => (
                <div
                  key={id}
                  className={cn(
                    "flex cursor-pointer gap-x-3 p-6 text-[#000000] transition-colors hover:bg-gray-50",
                    status === "UNREAD" && "bg-[#F6F7FE]",
                  )}
                  onClick={() => status === "UNREAD" && handleMarkAsRead(id)}
                >
                  <div className="relative">
                    <ImsAvatar src={""} alt={"Profile Image"} fallback={""} />
                    {status === "UNREAD" && (
                      <span className="bg-warning-400 absolute top-0 left-1 h-3 w-3 rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-light">{message}</p>
                    <span className="text-sm font-light text-gray-500">
                      {getRelativeTime(createdAt)}
                    </span>
                    {linkName && linkRoute && (
                      <div className="mt-5">
                        <Link href={linkRoute}>
                          <ImsButton variant="imsPrimary">{linkName}</ImsButton>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {hasMore && (
              <div
                ref={observerRef}
                className="flex items-center justify-center py-4"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">
                      Loading more notifications...
                    </span>
                  </div>
                ) : (
                  <div className="h-4" />
                )}
              </div>
            )}
            {!hasMore && notifications.length > 10 && (
              <div className="flex items-center justify-center py-4 text-gray-500">
                <span className="text-sm">
                  You've reached the end of notifications
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
