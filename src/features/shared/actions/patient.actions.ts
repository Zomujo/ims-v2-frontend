"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreatePatientDto,
  ApiSuccessResponseDto,
  CreatePatientResponseDto,
  PaginatedResponse,
  RetrievePatientsDto,
  RetrievePatientDto,
  UpdatePatientDto,
  ApiSuccessResponseNoData,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addPatient(data: CreatePatientDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<CreatePatientResponseDto>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.PATIENTS);
  return result;
}

export async function getPatients(params: {
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
  const url = new URL(API_ENDPOINTS.PATIENTS);
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
    next: { tags: [API_ENDPOINT_TAGS.PATIENTS] },
  };

  return await imsApiWithAuth<PaginatedResponse<RetrievePatientsDto>>(
    fetchOptions,
  );
}

export async function getPatient(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENT.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.PATIENTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<RetrievePatientDto>>(
    fetchOptions,
  );
}

export async function updatePatient(id: string, data: UpdatePatientDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENT.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.PATIENTS);
  return result;
}

export async function deletePatient(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.PATIENTS);
  return result;
}
