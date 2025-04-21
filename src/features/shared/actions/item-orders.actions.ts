"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  CreateItemOrderDto,
  ApiSuccessResponseDto,
  PaginatedResponse,
  GetItemOrdersResponseDto,
  GetItemOrderResponseDto,
  UpdateItemOrderDto,
  ApiSuccessResponseNoData,
  ChangeOrderStatusDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";
import { GenerateQueryParams } from "../types/utitls.types";
import { generateUrlWithQueryParams } from "@/lib/utils";

// Server Actions for /api/v1/item-orders
export async function createItemOrder(data: CreateItemOrderDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ORDERS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<CreateItemOrderDto>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.ITEM_ORDERS);
  return result;
}

export async function getItemOrders(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ITEM_ORDERS, params ?? {}),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEM_ORDERS] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<GetItemOrdersResponseDto>>(
      fetchOptions,
    )
  ).data;
}

// Server Actions for /api/v1/item-orders/{id}
export async function getItemOrder(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ORDER.replace(":id", id),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ITEM_ORDERS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetItemOrderResponseDto>>(
    fetchOptions,
  );
}

export async function updateItemOrder(id: string, data: UpdateItemOrderDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ORDER.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEM_ORDERS);
  return result;
}

export async function deleteItemOrder(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ORDER.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEM_ORDERS);
  return result;
}

// Server Action for /api/v1/item-orders/state/{id}
export async function changeItemOrderState(
  id: string,
  data: ChangeOrderStatusDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_ORDER_STATE.replace(":id", id),
    method: "PUT",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ITEM_ORDERS);
  return result;
}
