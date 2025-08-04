"use client";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";
import { toast } from "sonner";
import { useSessionData } from "@/hooks/useSessionData";

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
  const { userId } = useSessionData();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = async () => {
      console.log("[useOnlineStatus] You are back online");
      setIsOnline(true);
      await sendPendingRequestsToQueue();
    };
    const handleOffline = () => {
      console.log("[useOnlineStatus] No internet connectivity detected");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial log for current status
    if (navigator.onLine) {
      console.log("[useOnlineStatus] Initial: online");
    } else {
      console.log("[useOnlineStatus] Initial: offline");
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRequests = (url: string, body: any, method: Method = "POST") => {
    if (!isOnline) {
      void pushPendingRequest({
        url: `/api${url}`,
        method,
        body,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      toast.warning("You are currently offline. Your request will be queued.");
    }
  };

  return {
    isOnline,
    handleRequests,
  };
}
