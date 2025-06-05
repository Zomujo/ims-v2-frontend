"use server";

import { API_ENDPOINTS, API_ENDPOINT_TAGS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateStockAdjustmentDto,
  CreatedAdjustmentResponseDto,
  OneStockAdjustment,
  PaginatedResponse,
  UpdateStockAdjustmentDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

// Server Actions for /api/v1/stock-adjustments
export async function createStockAdjustment(data: CreateStockAdjustmentDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<CreatedAdjustmentResponseDto>>(
      fetchOptions,
    );
  revalidateTag(API_ENDPOINT_TAGS.STOCK_ADJUSTMENTS);
  return result;
}

export async function getStockAdjustments(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.STOCK_ADJUSTMENTS,
      params ?? {},
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.STOCK_ADJUSTMENTS] },
  };

  return (
    await imsApiWithAuth<PaginatedResponse<OneStockAdjustment>>(fetchOptions)
  ).data;
}

// Server Actions for /api/v1/stock-adjustments/{id}
export async function getStockAdjustment(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.STOCK_ADJUSTMENTS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<OneStockAdjustment>>(
    fetchOptions,
  );
}

export async function updateStockAdjustment(
  id: string,
  data: UpdateStockAdjustmentDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.STOCK_ADJUSTMENTS);
  return result;
}

export async function deleteStockAdjustment(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.STOCK_ADJUSTMENTS);
  return result;
}
