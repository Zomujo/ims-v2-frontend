"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateFacilityDto,
  ApiSuccessResponseDto,
  FacilityResponse,
  PaginatedResponse,
  UpdateFacilityDto,
  ApiSuccessResponseNoData,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithoutAuth, imsApiWithAuth } from "./ims-api.action";

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

export async function getFacilities(params: {
  search?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  dateRange?:
    | "today"
    | "this_week"
    | "this_month"
    | "last_month"
    | "last_three_months"
    | "this_year";
}) {
  const url = new URL(API_ENDPOINTS.FACILITIES);
  if (params.search) url.searchParams.append("search", params.search);
  if (params.page) url.searchParams.append("page", params.page.toString());
  if (params.pageSize)
    url.searchParams.append("pageSize", params.pageSize.toString());
  if (params.orderBy) url.searchParams.append("orderBy", params.orderBy);
  if (params.orderDirection)
    url.searchParams.append("orderDirection", params.orderDirection);
  if (params.dateRange) url.searchParams.append("dateRange", params.dateRange);

  const fetchOptions: FetchApi = {
    url: url.toString(),
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
