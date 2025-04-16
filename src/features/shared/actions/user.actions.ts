"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateSettingsDto,
  ApiSuccessResponseNoData,
  ApiSuccessResponseDto,
  GetSettingsDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addSettings(data: CreateSettingsDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.USER_SETTINGS,
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.USER_SETTINGS);
  return result;
}

export async function findSettings() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.USER_SETTINGS,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.USER_SETTINGS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSettingsDto>>(
    fetchOptions,
  );
}
