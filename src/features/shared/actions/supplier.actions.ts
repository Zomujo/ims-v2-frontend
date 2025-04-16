"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateItemsCategoryDto,
  CreateSupplierDto,
  GetSupplierResponse,
  GetSuppliersResponse,
  ItemCategoryResponse,
  PaginatedResponse,
  SupplierResponse,
  UpdateItemCategoryDto,
  UpdateSupplierDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
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
  return result;
}

export async function getSuppliers(params: {
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
  const url = new URL(API_ENDPOINTS.SUPPLIERS);
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
    next: { tags: [API_ENDPOINT_TAGS.SUPPLIERS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetSuppliersResponse>>(
    fetchOptions,
  );
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
  return result;
}

export async function addItemCategory(data: CreateItemsCategoryDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORIES,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<ItemCategoryResponse>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.ITEM_CATEGORIES);
  return result;
}

export async function getItemCategories(params: {
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
  const url = new URL(API_ENDPOINTS.ITEM_CATEGORIES);
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
    next: { tags: [API_ENDPOINT_TAGS.ITEM_CATEGORIES] },
  };

  return await imsApiWithAuth<PaginatedResponse<ItemCategoryResponse>>(
    fetchOptions,
  );
}

export async function getItemCategory(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORY.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEM_CATEGORIES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<ItemCategoryResponse>>(
    fetchOptions,
  );
}

export async function updateItemCategory(
  id: string,
  data: UpdateItemCategoryDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORY.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEM_CATEGORIES);
  return result;
}

export async function deleteItemCategory(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORY.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEM_CATEGORIES);
  return result;
}
