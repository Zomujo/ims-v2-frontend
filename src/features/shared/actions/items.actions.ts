"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  AdjustPriceDto,
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  BatchesNoPaginate,
  BatchResponseDto,
  CreateBatchDto,
  CreateItemDto,
  ExpiryItemsDto,
  IdData,
  ItemAnalytics,
  ItemCounts,
  ItemsDto,
  OneBatch,
  OneItem,
  PaginatedResponse,
  UpdateBatchDto,
  UpdateItemDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

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

export async function getItems(
  params?: GenerateQueryParams,
  arraySearch?: string,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.ITEMS,
      {
        ...params,
        orderDirection: "ASC",
        orderBy: "totalStock",
      },
      arraySearch,
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.ITEMS] },
  };

  return (await imsApiWithAuth<PaginatedResponse<ItemsDto>>(fetchOptions)).data;
}

export async function getItemsExpiry(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ITEMS_VALIDITY, params ?? {}),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS_VALIDITY] },
  };

  return (await imsApiWithAuth<PaginatedResponse<ExpiryItemsDto>>(fetchOptions))
    .data;
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
  revalidateTag(API_ENDPOINT_TAGS.ITEMS_BATCHES);
  revalidateTag(API_ENDPOINT_TAGS.ITEMS);
  return result;
}

export async function getBatchesNoPaginate(itemId: string) {
  if (!itemId) {
    return [];
  }
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEMS_BATCHES_NO_PAGINATE.replace(":itemId", itemId),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEMS_BATCHES] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<BatchesNoPaginate[]>>(
      fetchOptions,
    )
  ).data;
}

export async function getItemBatches(id: string, params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.ITEM_BATCHES.replace(":id", id),
      params ?? {},
    ),
    method: "GET",
    headers: {},
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

export async function removalMarkupFromBatch(batchId: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.BATCH_MARKUP.replace(":batchId", batchId),
    method: "DELETE",
    headers: {},
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

  return (await imsApiWithAuth<ApiSuccessResponseDto<IdData[]>>(fetchOptions))
    .data;
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
