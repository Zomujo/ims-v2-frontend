"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateReportDto,
  GetReportDataDto,
  GetReportDto,
  GetSaleDto,
  PaginatedResponse,
  UpdateReportDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { GenerateQueryParams } from "../types/utitls.types";

export async function addReport(data: CreateReportDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDto>>(
    fetchOptions,
  );
}

export async function getReports(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.REPORTS, params ?? {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return (await imsApiWithAuth<PaginatedResponse<GetReportDto>>(fetchOptions))
    .data;
}

export async function getReport(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT.replace(":id", id),
    method: "GET",
    headers: {},
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

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteReport(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function getReportData(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT_DATA.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDataDto>>(
    fetchOptions,
  );
}

export async function getSalesReport() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT_SALES,
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetSaleDto>>(fetchOptions);
}

export async function getCategorizedReport(
  params?: GenerateQueryParams,
  arraySearch?: string,
  routeParams?: Record<string, string>,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.CATEGORIZED_REPORT,
      params ?? {},
      arraySearch,
      routeParams,
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDataDto>>(
    fetchOptions,
  );
}
