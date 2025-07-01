"use server";

import { FetchApi } from "@features/shared/types/ims-api-action.types";
import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { imsApiWithAuth } from "@features/shared/actions/ims-api.action";
import { ApiSuccessResponseDto } from "@features/shared/types/action.types";
import {
  GeneralResponse,
  SellingItemsResponse,
  SalesTrend,
  DailySalesResponse,
  PaymentMethodResponse,
  SellingCategoriesResponse,
} from "@features/shared/types/dashboard.types";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { GenerateQueryParams } from "@features/shared/types/utitls.types";

export async function getGeneralOverview(
  params: Pick<GenerateQueryParams, "startDate" | "endDate">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.DASHBOARD_GENERAL, params),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_GENERAL] },
  };
  return (
    await imsApiWithAuth<ApiSuccessResponseDto<GeneralResponse>>(fetchOptions)
  ).data;
}

export async function getSalesTrend(
  params: Pick<GenerateQueryParams, "dateRange">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_SALES_TREND,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_SALES_TREND] },
  };

  return (await imsApiWithAuth<ApiSuccessResponseDto<SalesTrend>>(fetchOptions))
    .data;
}
export async function getTopSellingItems(
  params: Pick<GenerateQueryParams, "dateRange">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_TOP_SELLING_ITEMS,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_TOP_SELLING_ITEMS] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<SellingItemsResponse>>(
      fetchOptions,
    )
  ).data;
}
export async function getLeastSellingItems(
  params: Pick<GenerateQueryParams, "dateRange">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_LEAST_SELLING_ITEMS,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_LEAST_SELLING_ITEMS] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<SellingItemsResponse>>(
      fetchOptions,
    )
  ).data;
}

export async function getDailySales(
  params: Pick<GenerateQueryParams, "startDate" | "endDate">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_SALES_DAILY,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_SALES_DAILY] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<DailySalesResponse>>(
      fetchOptions,
    )
  ).data;
}

export async function getSellingCategories(
  params: Pick<GenerateQueryParams, "dateRange">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_ITEMS_CATEGORIES_TOP_SELLING,
      params,
    ),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_ITEMS_CATEGORIES_TOP_SELLING] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<SellingCategoriesResponse>>(
      fetchOptions,
    )
  ).data;
}

export async function getSalePaymentMethod(
  params: Pick<GenerateQueryParams, "dateRange">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.DASHBOARD_PAYMENT_METHODS,
      params,
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.DASHBOARD_PAYMENT_METHODS] },
  };

  return (
    await imsApiWithAuth<ApiSuccessResponseDto<PaymentMethodResponse>>(
      fetchOptions,
    )
  ).data?.topSelling;
}
