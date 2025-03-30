import { ENV_VARIABLES } from "@/lib/config/env.config";
import { FetchApi, IMSApiErrorResponse } from "../types/ims-api-action.types";
import { imsServerSession } from "@/lib/config/auth.config";
import { redirect } from "next/navigation";

export const imsApiWithAuth = async <T>({
  url,
  method,
  body,
  headers,
  cache,
  next,
}: FetchApi) => {
  const session = await imsServerSession();
  if (!session?.user?.tokens) {
    redirect("/auth/login");
  }
  const accessToken = session?.user?.tokens?.accessToken;
  return await fetchApi<T>({
    url,
    method,
    body,
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    cache,
    next,
  });
};
export const imsApiWithoutAuth = async <T>({
  url,
  method,
  body,
  headers,
  next,
  cache,
}: FetchApi) => {
  return await fetchApi<T>({ url, method, body, headers, cache, next });
};

const fetchApi = async <T>({
  url,
  method,
  body,
  headers,
  next,
  cache,
}: FetchApi): Promise<T> => {
  const fetchUrl = `${ENV_VARIABLES.IMS_API_ENPOINT}${url}`;
  const getHeaders = () => {
    if (body instanceof FormData) return headers;
    return { ...headers, "Content-Type": "application/json" };
  };

  const response = await fetch(fetchUrl, {
    method,
    headers: getHeaders(),
    body,
    next: {
      ...next,
      tags: [...url.split("?").slice(0, 1), ...(next?.tags ?? [])],
    },
    cache,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData as IMSApiErrorResponse));
  }

  return response.json();
};
