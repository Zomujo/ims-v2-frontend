"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  PaginatedResponse,
  ApiSuccessResponseNoData,
  AdjustPriceDto,
  BatchesNoPaginate,
  BatchResponseDto,
  CreateBatchDto,
  CreateItemDto,
  GetNoPaginateDto,
  ItemAnalytics,
  ItemCounts,
  OneBatch,
  OneItem,
  UpdateBatchDto,
  UpdateItemDto,
  ItemsDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { GenerateQueryParams } from "../types/utitls.types";

export async function addItem(data: CreateItemDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEMS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<OneItem>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  return result;
}

export async function getItems(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ITEMS, params ?? {}),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return (await imsApiWithAuth<PaginatedResponse<ItemsDto>>(fetchOptions)).data;
}

export async function addBatch(data: CreateBatchDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEMS_ADD_BATCH,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<OneBatch>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS_BATCHES);
  return result;
}

export async function getBatchesNoPaginate(itemId: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEMS_BATCHES_NO_PAGINATE.replace(":itemId", itemId),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS_BATCHES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<BatchesNoPaginate[]>>(
    fetchOptions,
  );
}

export async function getItemBatches(id: string, params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.ITEM_BATCHES.replace(":id", id),
      params ?? {},
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS_BATCHES] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<BatchResponseDto>>(fetchOptions)
  ).data;
}

export async function getBatch(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_BATCH.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS_BATCHES] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<BatchResponseDto>>(
    fetchOptions,
  );
}

export async function updateBatch(id: string, data: UpdateBatchDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_EDIT_BATCH.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS_BATCHES);
  return result;
}

export async function getItemsNoPaginate() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEMS_NO_PAGINATE,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetNoPaginateDto[]>>(
    fetchOptions,
  );
}

export async function getItemAnalytics(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ANALYTICS.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<ItemAnalytics>>(
    fetchOptions,
  );
}

export async function getItemCounts() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_COUNTS,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return (await imsApiWithAuth<ApiSuccessResponseDto<ItemCounts>>(fetchOptions))
    .data;
}

export async function getItem(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<OneItem>>(fetchOptions);
}

export async function updateItem(id: string, data: UpdateItemDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  return result;
}

export async function deleteItem(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  return result;
}

export async function adjustItemPrices(id: string, data: AdjustPriceDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ADJUST_PRICES.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  return result;
}
