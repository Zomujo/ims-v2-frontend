"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateFacilityDto,
  FacilityResponse,
  PaginatedResponse,
  UpdateFacilityDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth, imsApiWithoutAuth } from "./ims-api.action";

export async function addFacility(data: CreateFacilityDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.FACILITIES,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseDto<FacilityResponse>>(
    fetchOptions,
  );
}

export async function getFacilities(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.FACILITIES, params),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.FACILITIES] },
  };

  return await imsApiWithoutAuth<PaginatedResponse<FacilityResponse>>(
    fetchOptions,
  );
}

export async function getFacility(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.FACILITY.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.FACILITIES] },
  };

  return await imsApiWithoutAuth<ApiSuccessResponseDto<FacilityResponse>>(
    fetchOptions,
  );
}

export async function updateFacility(id: string, data: UpdateFacilityDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.FACILITY.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteFacility(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.FACILITY.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
