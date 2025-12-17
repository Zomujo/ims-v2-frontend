"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateSaleDto,
  CreateSaleResponseDto,
  GetSaleDto,
  GetSalesDto,
  GetSalesItemsDto,
  PaginatedResponse,
  UpdateSalesDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { GenerateQueryParams } from "../types/utitls.types";

export async function addSale(data: CreateSaleDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALES,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<CreateSaleResponseDto>>(
    fetchOptions,
  );
}

export async function getSales(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.SALES, params ?? {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SALES] },
  };

  return (await imsApiWithAuth<PaginatedResponse<GetSalesDto>>(fetchOptions))
    .data;
}

export async function getSale(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SALES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSaleDto>>(fetchOptions);
}

export async function updateSale(id: string, data: UpdateSalesDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify({
      ...data,
      insured: data.insured === "true", // Convert insured to boolean
    }),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteSale(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function getSaleItems(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE_ITEMS.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.SALES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSalesItemsDto[]>>(
    fetchOptions,
  );
}

export async function returnSale(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE_RETURN.replace(":id", id),
    method: "PATCH",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
