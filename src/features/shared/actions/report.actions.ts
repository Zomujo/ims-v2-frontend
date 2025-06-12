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
  GetSaleDto,
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

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<GetReportDto>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.REPORTS);
  return result;
}

export async function getReports(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.REPORTS, params ?? {}),
    method: "GET",
    headers: {},
    cache: "force-cache",
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

export async function getSalesReport() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.REPORT_SALES,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetSaleDto>>(fetchOptions);
}

export async function getCategorizedReport(category: string, id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.CATEGORIZED_REPORT.replace(":id", id).replace(
      ":category",
      category,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.REPORTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetReportDataDto>>(
    fetchOptions,
  );
}
