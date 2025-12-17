"use server";
import { GenerateQueryParams } from "@features/shared/types/utitls.types";
import { FetchApi } from "@features/shared/types/ims-api-action.types";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { imsApiWithAuthBlob } from "@features/shared/actions/ims-api.action";

export async function exportFile(
  endpoint: string,
  params: Pick<GenerateQueryParams, "exportType">,
) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(endpoint, params),
    method: "GET",
    headers: {},
  };
  return await imsApiWithAuthBlob(fetchOptions);
}
