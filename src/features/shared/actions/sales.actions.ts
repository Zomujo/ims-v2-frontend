"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateSaleDto,
  ApiSuccessResponseDto,
  CreateSaleResponseDto,
  PaginatedResponse,
  GetSalesDto,
  GetSaleDto,
  UpdateSalesDto,
  ApiSuccessResponseNoData,
  GetSalesItemsDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addSale(data: CreateSaleDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALES,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<CreateSaleResponseDto>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.SALES);
  return result;
}

export async function getSales(params: {
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
  const url = new URL(API_ENDPOINTS.SALES);
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
    next: { tags: [API_ENDPOINT_TAGS.SALES] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetSalesDto>>(fetchOptions);
}

export async function getSale(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.SALES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetSaleDto>>(fetchOptions);
}

export async function updateSale(id: string, data: UpdateSalesDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SALES);
  return result;
}

export async function deleteSale(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SALES);
  return result;
}

export async function getSaleItems(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.SALE_ITEMS.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
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

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.SALES);
  return result;
}
