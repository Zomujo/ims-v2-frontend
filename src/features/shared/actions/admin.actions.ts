"use server";

import { revalidateTag } from "next/cache";
import { FetchApi } from "../types/ims-api-action.types";
import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { imsApiWithAuth } from "./ims-api.action";
import {
  ApiSuccessResponseDto,
  CreateUserDto,
  GetAdminUserDto,
  PaginatedResponse,
} from "../types/action.types";

export async function createUser(data: CreateUserDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ADMIN_USER,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<GetAdminUserDto>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ADMIN_USERS);
  return result;
}

export async function getFacilityPersonnel(params: {
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
  const url = new URL(API_ENDPOINTS.ADMIN_USERS);
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
    next: { tags: [API_ENDPOINT_TAGS.ADMIN_USERS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetAdminUserDto>>(fetchOptions);
}
