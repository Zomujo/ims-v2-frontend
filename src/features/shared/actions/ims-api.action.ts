import { ENV_VARIABLES } from "@/lib/config/env.config";
import { FetchApi, IMSApiErrorResponse } from "../types/ims-api-action.types";

export const imsApiWithAuth = async <T>({
  url,
  method,
  body,
  headers,
}: FetchApi) => {
  return await fetchApi<T>({ url, method, body, headers });
};
export const imsApiWithoutAuth = async <T>({
  url,
  method,
  body,
  headers,
}: FetchApi) => {
  return await fetchApi<T>({ url, method, body, headers });
};

const fetchApi = async <T>({
  url,
  method,
  body,
  headers,
}: FetchApi): Promise<T> => {
  const fetchUrl = `${ENV_VARIABLES.IMS_API_ENPOINT}${url}`;
  const response = await fetch(fetchUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData as IMSApiErrorResponse));
  }

  return response.json();
};
