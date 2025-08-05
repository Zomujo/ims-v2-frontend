"use client";
import { useEffect } from "react";
import localforage from "localforage";
import { CacheKey } from "@/lib/cache/cache-data";
import { toast } from "sonner";
import { useSessionData } from "@/hooks/useSessionData";
import { useGlobalNotifications } from "@features/notifications/notifications-context";
// import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
// import { UI_STATE } from "@/lib/constant";
import { UseFormReturn } from "react-hook-form";
import { handleRequestState } from "@/lib/utils";
import {
  Method,
  sendPendingRequests,
  SyncPayloadDto,
} from "@features/shared/actions/sync.actions";

let isSyncing = false;

export async function pushPendingRequest(request: SyncPayloadDto) {
  const existingPendingRequests: SyncPayloadDto[] =
    (await localforage.getItem(CacheKey.PendingRequests)) || [];
  existingPendingRequests.push(request);
  await localforage.setItem(CacheKey.PendingRequests, existingPendingRequests);
}

export function useOnlineStatus() {
  const { isConnected } = useGlobalNotifications();
  const { userId } = useSessionData();
  // const { removeSearchParams } = useImsSearchParams();

  async function sendPendingRequestsToQueue() {
    if (isSyncing) return;

    const pending =
      (await localforage.getItem<SyncPayloadDto[]>(CacheKey.PendingRequests)) ||
      [];
    if (pending.length === 0) {
      return;
    }
    isSyncing = true;
    const res = sendPendingRequests({
      data: pending,
    });

    handleRequestState({
      res: res as unknown as Promise<Record<string, unknown>>,
      loadingMsg: "Syncing saved requests during offline...",
      successMsg: "Saved requests synced successfully.",
      errorMsg: "Failed to sync saved requests.",
    });

    res
      .then(async () => {
        await localforage.setItem(CacheKey.PendingRequests, []);
      })
      .finally(() => {
        isSyncing = false;
      });
  }

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
        url: `/api/v1${url}`,
        method,
        body,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      // if (removeStateSearchParam) {
      //   removeSearchParams(UI_STATE);
      // }

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
