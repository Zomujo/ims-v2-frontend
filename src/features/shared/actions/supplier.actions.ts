"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateSupplierDto,
  GetSupplierResponse,
  GetSuppliersResponse,
  IdData,
  PaginatedResponse,
  SupplierResponse,
  UpdateSupplierDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { CRUDACTION, GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";
import { AuthApiStandardResponse } from "../types/auth-action.types";

export async function addSupplier(data: Partial<CreateSupplierDto>) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIERS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<SupplierResponse>>(
    fetchOptions,
  );
}

export async function getSuppliers(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.SUPPLIERS, params ?? {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SUPPLIERS] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<GetSuppliersResponse>>(fetchOptions)
  ).data;
}

export async function getSuppliersNoPaginate() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIERS_NO_PAGINATE,
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SUPPLIERS_NO_PAGINATE] },
  };

  return (await imsApiWithAuth<ApiSuccessResponseDto<IdData[]>>(fetchOptions))
    .data;
}

export async function getSupplier(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIER.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SUPPLIERS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSupplierResponse>>(
    fetchOptions,
  );
}

export async function updateSupplier(id: string, data: UpdateSupplierDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIER.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
export async function deleteSupplier(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIER.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export const activateDeactivateSuppliersAction = async (
  supplyId: string,
  action: CRUDACTION,
) => {
  try {
    return await imsApiWithAuth<AuthApiStandardResponse>({
      url: `${API_ENDPOINTS.SUPPLIERS}/${supplyId}/${action}`,
      method: "PATCH",
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
