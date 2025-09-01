import { imsServerSession } from "@/lib/config/auth.config";
import { ENV_VARIABLES } from "@/lib/config/env.config";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import { redirect } from "next/navigation";
import { FetchApi } from "../types/ims-api-action.types";
import { headers as nextHeaders } from "next/headers";

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
    redirect(AUTH_PAGE_ROUTES.LOG_IN);
  }
  const userId = session?.user?.id;
  const response = await fetchApi({
    url,
    method,
    body,
    headers: { ...headers, Authorization: `Bearer ${userId}` },
    cache,
    next,
  });
  return fetchJson<T>(response);
};

export const imsApiWithAuthBlob = async ({
  url,
  method,
  body,
  headers,
  cache,
  next,
}: FetchApi) => {
  const session = await imsServerSession();
  if (!session?.user?.tokens) {
    redirect(AUTH_PAGE_ROUTES.LOG_IN);
  }
  const userId = session?.user?.id;
  const response = await fetchApi({
    url,
    method,
    body,
    headers: { ...headers, Authorization: `Bearer ${userId}` },
    cache,
    next,
  });
  return fetchBlob(response);
};

export const imsApiWithoutAuth = async <T>({
  url,
  method,
  body,
  headers,
  next,
  cache,
}: FetchApi) => {
  try {
    const response = await fetchApi({
      url,
      method,
      body,
      headers,
      cache,
      next,
    });
    return fetchJson<T>(response);
  } catch (e) {
    console.error("IMS API Error:", e);
    return {
      data: null,
      error: e instanceof Error ? e.message : "An unknown error occurred",
    } as T;
  }
};

const fetchJson = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return {} as T; // Return empty object for 204 No Content
  }
  const data = await response.json();
  return data as T;
};

const fetchBlob = async (response: Response): Promise<Blob> => {
  if (response.status === 204) {
    return new Blob(); // Return empty Blob for 204 No Content
  }
  return await response.blob();
};

const fetchApi = async ({
  url,
  method,
  body,
  headers,
  next,
  cache,
}: FetchApi) => {
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

    if (errorData.message === "TOKEN_EXPIRED" && errorData.statusCode === 401) {
      const headerList = await nextHeaders();
      const refererUrl = headerList.get("referer");
      redirect(
        `${AUTH_PAGE_ROUTES.LOG_IN}?redirect=${encodeURIComponent(refererUrl ?? "")}`,
      );
    }

    throw new Error(errorData.message);
  }

  return response;
};
