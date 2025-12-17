"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateSettingsDto,
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

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function findSettings() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.USER_SETTINGS,
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.USER_SETTINGS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSettingsDto>>(
    fetchOptions,
  );
}
