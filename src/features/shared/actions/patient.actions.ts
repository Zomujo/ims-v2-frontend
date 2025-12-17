"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreatePatientDto,
  CreatePatientResponseDto,
  PaginatedResponse,
  RetrievePatientDto,
  RetrievePatientsDto,
  UpdatePatientDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { GenerateQueryParams } from "../types/utitls.types";

export async function addPatient(data: CreatePatientDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<CreatePatientResponseDto>>(
    fetchOptions,
  );
}

export async function getPatients(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.PATIENTS, params),
    method: "GET",
    headers: {},
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

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deletePatient(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.PATIENT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
