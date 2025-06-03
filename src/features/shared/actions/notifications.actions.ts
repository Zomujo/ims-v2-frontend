"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
} from "../types/action.types";
import {
  FetchApi,
  IMSNotificationPaginationResponse,
} from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { NotificationPayload } from "@features/shared/types/notifications.types";

export async function fetchNotifications(page = 1) {
  const fetchOptions: FetchApi = {
    url: `${API_ENDPOINTS.NOTIFICATIONS}?page=${page}`,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.NOTIFICATIONS] },
  };

  return await imsApiWithAuth<
    ApiSuccessResponseDto<
      IMSNotificationPaginationResponse<NotificationPayload>
    >
  >(fetchOptions);
}

export async function markNotificationsAsRead() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.NOTIFICATIONS_READ_ALL,
    method: "PUT",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.NOTIFICATIONS);
  return result;
}

export async function markNotificationAsRead(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.NOTIFICATIONS_READ_ONE.replace(":id", id),
    method: "PUT",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.NOTIFICATIONS);
  return result;
}

export async function deleteNotification(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.NOTIFICATIONS_DELETE.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.NOTIFICATIONS);
  return result;
}
