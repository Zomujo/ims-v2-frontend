"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateItemsCategoryDto,
  ItemCategoryResponse,
  PaginatedResponse,
  UpdateItemCategoryDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addItemCategory(data: CreateItemsCategoryDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORIES,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<ItemCategoryResponse>>(
    fetchOptions,
  );
}

export async function getItemCategories(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.ITEM_CATEGORIES,
      params ?? {},
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.ITEM_CATEGORIES] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<ItemCategoryResponse>>(fetchOptions)
  ).data;
}
export async function getItemCategoriesNoPaginate() {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.ITEM_CATEGORIES_NO_PAGINATE,
      {},
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINTS.ITEM_CATEGORIES_NO_PAGINATE] },
  };

  return (await imsApiWithAuth<{ data: ItemCategoryResponse[] }>(fetchOptions))
    .data;
}

export async function getItemCategory(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORY.replace(":id", id),
    method: "GET",
    headers: {},
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

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteItemCategory(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_CATEGORY.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
