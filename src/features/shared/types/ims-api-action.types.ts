export type FetchApi = {
  url: string;
  method?: RequestInit["method"];
  body?: RequestInit["body"];
  headers?: RequestInit["headers"];
  next?: RequestInit["next"];
  cache?: RequestInit["cache"];
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

export type IMSPaginationData = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type IMSApiActionPaginationResponse<T> = IMSApiActionResponse<
  {
    rows: T[];
  } & IMSPaginationData
>;
