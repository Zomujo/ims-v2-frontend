"use server";

import { ApiSuccessResponseNoData } from "@features/shared/types/action.types";
import { FetchApi } from "@features/shared/types/ims-api-action.types";
import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { imsApiWithAuth } from "@features/shared/actions/ims-api.action";
import { revalidateTag } from "next/cache";

export type Method = "POST" | "PATCH" | "PUT" | "DELETE";

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

export async function sendPendingRequests(data: { data: SyncPayloadDto[] }) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SYNC,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.USER_SETTINGS);
  return result;
}
