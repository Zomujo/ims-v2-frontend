"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
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

  const result =
    await imsApiWithoutAuth<ApiSuccessResponseDto<FacilityResponse>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.FACILITIES);
  return result;
}

export async function getFacilities(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.FACILITIES, params),
    method: "GET",
    headers: {},
    cache: "force-cache",
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
    cache: "force-cache",
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

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.FACILITIES);
  return result;
}

export async function deleteFacility(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.FACILITY.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.FACILITIES);
  return result;
}
