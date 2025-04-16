"use server";

import { API_ENDPOINTS } from "@/lib/api-constants";
import {
  CreateComplaintDto,
  ApiSuccessResponseNoData,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function addComplaint(data: CreateComplaintDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.COMPLAINTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
