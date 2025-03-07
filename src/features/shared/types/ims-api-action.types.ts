export type FetchApi = {
  url: string;
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  headers?: RequestInit["headers"];
};

export type IMSApiErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

export type IMSApiActionResponse<T> = {
  data: T;
  statusCode: number;
  message: string;
};
