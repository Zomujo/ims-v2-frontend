"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateReportDto,
  ApiSuccessResponseDto,
  GetReportDto,
  PaginatedResponse,
  UpdateReportDto,
  ApiSuccessResponseNoData,
  GetReportDataDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addReport(data: CreateReportDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<GetReportDto>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.REPORTS);
  return result;
}

export async function getReports(params: {
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
  const url = new URL(API_ENDPOINTS.REPORTS);
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
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetReportDto>>(fetchOptions);
}

export async function getReport(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDto>>(
    fetchOptions,
  );
}

export async function updateReport(id: string, data: UpdateReportDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.REPORTS);
  return result;
}

export async function deleteReport(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.REPORTS);
  return result;
}

export async function getReportData(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT_DATA.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDataDto>>(
    fetchOptions,
  );
}
