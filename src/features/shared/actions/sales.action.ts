"use server";
import { API_ENDPOINTS_OLD } from "@/lib/constant";
import { imsApiWithAuth } from "./ims-api.action";
import { GenerateQueryParams } from "../types/utitls.types";
import { generateQueryParams } from "@/lib/utils";
import {
  GetPatientsAPIResponse,
  GetSalesAPIResponse,
  GetSalesItemsAPIResponse,
} from "../types/sales-action.types";
import { AuthApiStandardResponse } from "../types/auth-action.types";
import { safeRequest } from "@features/shared/actions/base.actions";

export const getSalesAction = async (searchParams?: GenerateQueryParams) => {
  const queryParams = generateQueryParams(searchParams);
  const res = await imsApiWithAuth<GetSalesAPIResponse>({
    url: `${API_ENDPOINTS_OLD.SALES}${searchParams ? "/?" + queryParams : ""}`,
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [queryParams],
    },
  });
  return res.data;
};

export const getSalesPatientListAction = async (
  searchParam?: GenerateQueryParams & { patientSearch?: string },
) => {
  const queryParams = generateQueryParams({
    search: searchParam?.patientSearch ?? "",
  });
  const res = await imsApiWithAuth<GetPatientsAPIResponse>({
    url: `${API_ENDPOINTS_OLD.PATIENTS}${searchParam ? "/?" + queryParams : ""}`,
    method: "GET",
    next: {
      tags: [queryParams],
    },
  });
  return res.data;
};

export const createNewPatientAction = async <T>(data: T) => {
  return safeRequest(() =>
    imsApiWithAuth<AuthApiStandardResponse>({
      url: `${API_ENDPOINTS_OLD.PATIENTS}`,
      method: "POST",
      body: JSON.stringify(data),
    }),
  );
};

export const getSalesItemsAction = async (
  searchParam?: GenerateQueryParams,
) => {
  const queryParams = generateQueryParams(searchParam);
  const res = await imsApiWithAuth<GetSalesItemsAPIResponse>({
    url: `${API_ENDPOINTS_OLD.SALES_ITEMS}${searchParam ? "/?" + queryParams : ""}`,
    method: "GET",
    next: {
      tags: [queryParams],
    },
  });
  return res.data;
};

export const createSaleAction = async (sale: unknown) => {
  return safeRequest(() =>
    imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.SALES,
      method: "POST",
      body: JSON.stringify({
        ...(sale as object),
        insured: (sale as { insured: "true" | "false" }).insured === "true", // Convert insured to boolean
      }),
    }),
  );
};

export const deleteSaleAction = async (saleId: string) => {
  return safeRequest(() =>
    imsApiWithAuth<AuthApiStandardResponse>({
      url: `${API_ENDPOINTS_OLD.SALES}/${saleId}`,
      method: "DELETE",
    }),
  );
};

export const getIcdCodes = async (searchParam?: GenerateQueryParams) => {
  try {
    const queryParams = generateQueryParams(searchParam);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLINICAL_TABLES}${API_ENDPOINTS_OLD.SALES_ICD_CODES}${searchParam ? "&" + queryParams : ""}`,
      {
        method: "GET",
      },
    );
    const data = (await res.json()) as Array<Array<Array<string>>>;
    return data[3].map((item) => ({
      label: `${item[1]} ${item[0]}`,
      value: `${item[1]} ${item[0]}`,
    }));
  } catch {
    throw new Error("Failed to fetch ICD codes");
  }
};
