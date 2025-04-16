"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateDepartmentRequestDto,
  ApiSuccessResponseDto,
  GetDepartmentRequestResponseDto,
  PaginatedResponse,
  GetSpecificRequestResponseDto,
  UpdateDepartmentRequestDto,
  ApiSuccessResponseNoData,
  GetItemRequestsResponseDto,
  UpdateRequestStatusDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addDepartmentRequest(data: CreateDepartmentRequestDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUESTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<
      ApiSuccessResponseDto<GetDepartmentRequestResponseDto>
    >(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM);
  return result;
}

export async function getDepartmentRequests(params: {
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
  const url = new URL(API_ENDPOINTS.DEPARTMENT_REQUESTS);
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
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS] },
  };

  return await imsApiWithAuth<
    PaginatedResponse<GetDepartmentRequestResponseDto>
  >(fetchOptions);
}

export async function getDepartmentRequest(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUEST.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS] },
  };

  return await imsApiWithAuth<
    ApiSuccessResponseDto<GetSpecificRequestResponseDto>
  >(fetchOptions);
}

export async function updateDepartmentRequest(
  id: string,
  data: UpdateDepartmentRequestDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUEST.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM);
  return result;
}

export async function deleteDepartmentRequest(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUEST.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM);
  return result;
}

export async function getItemRequests(params: {
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
  const url = new URL(API_ENDPOINTS.DEPARTMENT_REQUESTS_ITEM);
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
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetItemRequestsResponseDto>>(
    fetchOptions,
  );
}

export async function updateRequestStatus(
  id: string,
  data: UpdateRequestStatusDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUEST_STATUS.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM);
  return result;
}
