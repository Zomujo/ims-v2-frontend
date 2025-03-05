import { ENV_VARIABLES } from "@/lib/config/env.config";

type FetchApi = {
  url: string;
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  headers?: RequestInit["headers"];
};

export const imsApi = ({ url, method, body, headers }: FetchApi) => {
  const fetchUrl = `${ENV_VARIABLES.IMS_API_ENPOINT}${url}`;

  return {
    apiWithAuth: async function <T>() {
      return await fetchApi<T>({ url: fetchUrl, method, body, headers });
    },
    apiWithoutAuth: async function <T>() {
      return await fetchApi<T>({ url, method, body, headers });
    },
  };
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
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
