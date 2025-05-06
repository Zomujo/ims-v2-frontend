"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
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
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addSupplier(data: CreateSupplierDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIERS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<SupplierResponse>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS_NO_PAGINATE);
  return result;
}

export async function getSuppliers(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.SUPPLIERS, params ?? {}),
    method: "GET",
    headers: {},
    cache: "force-cache",
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
    cache: "force-cache",
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
    cache: "force-cache",
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

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS_NO_PAGINATE);
  return result;
}
export async function deleteSupplier(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SUPPLIER.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS);
  revalidateTag(API_ENDPOINT_TAGS.SUPPLIERS_NO_PAGINATE);
  return result;
}
