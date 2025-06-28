"use server";

import { GenerateQueryParams } from "@features/shared/types/utitls.types";
import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { AuditLog } from "@features/shared/types/activity.types";
import { imsApiWithAuth } from "./ims-api.action";
import { PaginatedResponse } from "@features/shared/types/action.types";
import { generateUrlWithQueryParams } from "@/lib/utils";

export async function getAuditLogs(
  params?: GenerateQueryParams,
  arraySearch?: string,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(
      API_ENDPOINTS.AUDITS,
      params ?? {},
      arraySearch,
    ),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.AUDITS] },
  };

  return (await imsApiWithAuth<PaginatedResponse<AuditLog>>(fetchOptions)).data;
}
