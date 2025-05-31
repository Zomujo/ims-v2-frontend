"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateDepartmentRequestDto,
  GetDepartmentRequestResponseDto,
  GetItemRequestsResponseDto,
  GetSpecificRequestResponseDto,
  PaginatedResponse,
  RequestStatus,
  UpdateDepartmentRequestDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { GenerateQueryParams } from "../types/utitls.types";
import { generateUrlWithQueryParams } from "@/lib/utils";

export async function addDepartmentRequest(data: CreateDepartmentRequestDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_ITEM_REQUESTS,
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

export async function getDepartmentRequests(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DEPARTMENT_REQUESTS,
      params ?? {},
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<GetDepartmentRequestResponseDto>>(
      fetchOptions,
    )
  ).data;
}

export async function getDepartmentItemRequests(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DEPARTMENT_ITEM_REQUESTS,
      params ?? {},
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_ITEM_REQUESTS] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<GetDepartmentRequestResponseDto>>(
      fetchOptions,
    )
  ).data;
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
    url: API_ENDPOINTS.DEPARTMENT_ITEM_REQUEST.replace(":id", id),
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
    url: API_ENDPOINTS.DEPARTMENT_ITEM_REQUEST.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS);
  revalidateTag(API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM);
  return result;
}

export async function getItemRequests(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DEPARTMENT_REQUESTS_ITEM,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DEPARTMENT_REQUESTS_ITEM] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetItemRequestsResponseDto>>(
    fetchOptions,
  );
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.DEPARTMENT_REQUEST.replace(":id", id),
    method: "PUT",
    headers: {},
    body: JSON.stringify({ status }),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
