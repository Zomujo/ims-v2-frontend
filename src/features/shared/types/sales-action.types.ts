import {
  IMSApiActionPaginationResponse,
  IMSApiActionResponse,
} from "./ims-api-action.types";
import { BatchMarkup } from "@features/shared/types/action.types";

export type Patient = {
  id: string;
  cardIdentificationNumber: string;
  name: string;
};

export type SaleItem = {
  item: Item;
  batchId: string;
  batchNumber: string;
  quantity: number;
  markup: BatchMarkup;
  validity: string;
};

export type Sale = {
  id: string;
  notes: string;
  saleNumber: string;
  status: string;
  total: number;
  subTotal: number;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
  saleItems: SaleItem | SaleItem[];
  remainderItems: number;
  totalQuantity: number;
  paymentType: string;
  departmentId: string;
  facilityId: string;
};

export type Item = {
  id: string;
  name: string;
  brandName: string;
  costPrice: number;
  sellingPrice: number;
  dosageForm: string;
  code: string;
  fdaApproval: string;
  ISO: string;
  reorderPoint: number;
  strength: string;
  unitOfMeasurement: string;
  manufacturer: string;
  storageReq: string;
  categoryId: string;
  createdBy: string;
  createdById: string;
  facilityId: string;
  departmentId: string;
  status: string;
};

export enum SALES_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
export type GetSalesAPIResponse = IMSApiActionPaginationResponse<Sale>;

export type GetPatientsAPIResponse = IMSApiActionResponse<Patient[]>;
export type GetSalesItemsAPIResponse = IMSApiActionPaginationResponse<SaleItem>;
