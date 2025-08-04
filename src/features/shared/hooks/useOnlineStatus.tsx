"use client";
import { useEffect } from "react";
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";
import { toast } from "sonner";
import { useSessionData } from "@/hooks/useSessionData";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
import { UI_STATE } from "@/lib/constant";
import { UseFormReturn } from "react-hook-form";

type Method = "POST" | "PATCH" | "PUT" | "DELETE";
interface Headers {
  Authorization: string;
}
export interface SyncPayloadDto {
  method: Method;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers: Headers;
}

export async function pushPendingRequest(request: SyncPayloadDto) {
  const existingPendingRequests: SyncPayloadDto[] =
    (await localforage.getItem(CacheKey.PendingRequests)) || [];
  existingPendingRequests.push(request);
  await localforage.setItem(CacheKey.PendingRequests, existingPendingRequests);
}

async function sendPendingRequestsToQueue() {
  const pending =
    (await localforage.getItem<SyncPayloadDto[]>(CacheKey.PendingRequests)) ||
    [];
  if (pending.length === 0) return;

  await fetch("/api/bullmq/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests: pending }),
  });

  await localforage.setItem(CacheKey.PendingRequests, []);
}

export function useOnlineStatus() {
  const { isConnected } = useGlobalNotifications();
  const { userId } = useSessionData();
  const { removeSearchParams } = useImsSearchParams();

  useEffect(() => {
    if (isConnected) {
      void sendPendingRequestsToQueue();
    }
  }, [isConnected]);

  const handleRequests = (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    method: Method = "POST",
    removeStateSearchParam = true,
    form?: UseFormReturn,
  ) => {
    if (!isConnected) {
      void pushPendingRequest({
        url: `/api${url}`,
        method,
        body,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      if (removeStateSearchParam) {
        removeSearchParams(UI_STATE);
      }

      if (form) {
        form.reset();
      }
      toast.warning("You are currently offline. Your request will be queued.");
    }
  };

  return {
    isOnline: isConnected,
    handleRequests,
  };
}
