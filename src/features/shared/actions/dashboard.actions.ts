"use server";

import { FetchApi } from "@features/shared/types/ims-api-action.types";
import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { imsApiWithAuth } from "@features/shared/actions/ims-api.action";
import { ApiSuccessResponseDto } from "@features/shared/types/action.types";
import { GeneralResponse } from "@features/shared/types/dashboard.types";
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
