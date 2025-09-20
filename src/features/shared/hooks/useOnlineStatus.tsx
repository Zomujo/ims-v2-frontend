"use client";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";
import { toast } from "sonner";
import { useSessionData } from "@/hooks/useSessionData";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
import { UI_STATE } from "@/lib/constant";
import { UseFormReturn } from "react-hook-form";
import { handleRequestState } from "@/lib/utils";
import {
  Method,
  sendPendingRequests,
  SyncPayloadDto,
} from "@features/shared/actions/sync.actions";

// A simple singleton to manage the sync process and prevent race conditions.
const createSyncManager = () => {
  let isSyncing = false;

  return {
    run: async (syncFn: () => Promise<void>) => {
      if (isSyncing) {
        return;
      }
      isSyncing = true;
      try {
        await syncFn();
      } finally {
        isSyncing = false;
      }
    },
  };
};

const syncManager = createSyncManager();

export async function pushPendingRequest(request: SyncPayloadDto) {
  const existingPendingRequests: SyncPayloadDto[] =
    (await localforage.getItem(CacheKey.PendingRequests)) || [];
  existingPendingRequests.push(request);
  await localforage.setItem(CacheKey.PendingRequests, existingPendingRequests);
}

export function useOnlineStatus() {
  const { isConnected } = useGlobalNotifications();
  // const [isConnected, setIsConnected] = useState(navigator.onLine);
  const { userId } = useSessionData();

  async function sendPendingRequestsToQueue() {
    const pending =
      (await localforage.getItem<SyncPayloadDto[]>(CacheKey.PendingRequests)) ||
      [];
    if (pending.length === 0) return;

    const res = sendPendingRequests({
      data: pending,
    });

    handleRequestState({
      res: res as unknown as Promise<Record<string, unknown>>,
      loadingMsg: "Syncing saved requests during offline...",
      successMsg: "Saved requests synced successfully.",
      errorMsg: "Failed to sync saved requests.",
    });

    await res;
    await localforage.setItem(CacheKey.PendingRequests, []);
  }

  useEffect(() => {
    if (isConnected) {
      void syncManager.run(sendPendingRequestsToQueue);
    }
  }, [isConnected]);

  //Todo:  research on the best approach
  // useEffect(() => {
  //   const handleOnline = () => setIsConnected(true);
  //   const handleOffline = () => setIsConnected(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);

  const handleRequests = (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    {
      method = "POST",
      removeSearchParams,
      form,
    }: {
      method?: Method;
      removeSearchParams?: (key: string) => void;
      form?: UseFormReturn;
    } = {},
  ) => {
    if (!isConnected) {
      void pushPendingRequest({
        url: `/api/v1${url}`,
        method,
        body,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      if (removeSearchParams) {
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
