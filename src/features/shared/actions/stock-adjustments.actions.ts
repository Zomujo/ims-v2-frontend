"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreatedAdjustmentResponseDto,
  CreateStockAdjustmentDto,
  OneStockAdjustment,
  PaginatedResponse,
  UpdateStockAdjustmentDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function createStockAdjustment(data: CreateStockAdjustmentDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<
    ApiSuccessResponseDto<CreatedAdjustmentResponseDto>
  >(fetchOptions);
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

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteStockAdjustment(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
