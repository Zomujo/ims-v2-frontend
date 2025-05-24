export type ApiSuccessResponseDto<T = unknown> = {
  statusCode: number;
  message: string;
  data?: T;
};

export type ApiSuccessResponseNoData = {
  statusCode: number;
  message: string;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error?: string;
};

export type IdData = {
  id: string;
  name: string;
};

export type GetNotificationDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  message: string;
  read: boolean;
  userId: string;
};

export type AdminSignUpDto = {
  email: string;
  password: string;
  name: string;
};

export type LoginTokenDto = {
  accessToken: string;
  refreshToken: string;
};

export type ImageUploadDto = {
  file: File;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type GetUserDto = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type CreateLoginSessionDto = {
  id: string;
  createdAt: string;
  expiresAt: string;
  device: string;
};

export type RefreshTokenDto = {
  accessToken: string;
  refreshToken: string;
};

export type SendForgotPasswordEmailDto = {
  email: string;
};

export type CheckCodeDto = {
  code: string;
};

export type ResetPasswordDto = {
  password: string;
  code: string;
};

export type UpdateUserDto = {
  name?: string;
  email?: string;
};

export type ChangePasswordDto = {
  oldPassword: string;
  newPassword: string;
};

export type CreateFacilityDto = {
  name: string;
  address: string;
  city: string;
  country: string;
};

export type FacilityResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  city: string;
  country: string;
};

export type UpdateFacilityDto = {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
};

export type CreateSettingsDto = {
  [key: string]: unknown;
};

export type GetSettingsDto = {
  [key: string]: unknown;
};

export type CreateUserDto = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export type GetAdminUserDto = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  role: string;
};

export type SupplierResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  brandTradeName?: string;
  supplierType: string;
  minimumOrderQuantity?: number;
  leadTime: string;
  deliveryMethod: string;
  primaryContactName: string;
  jobTitle: string;
  department: string;
  phoneNumber: string;
  email: string;
  physicalAddress: string;
  mailingAddress?: string;
  emergencyContactName?: string;
  emergencyContactTitle?: string;
  emergencyContactNumber?: string;
  paymentType: "Bank" | "Mobile Money";
  currency: string;
  paymentTerms: string;
  bankName?: string;
  accountType?: string;
  accountNumber?: string;
  provider?: "MTN" | "Vodafone" | "Airteltigo";
  mobileMoneyPhoneNumber?: string;
  status: string;
};

export type CreateSupplierDto = Omit<
  SupplierResponse,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type GetSuppliersResponse = {
  id: string;
  createdAt: string;
  name: string;
  phoneNumber: string;
  physicalAddress: string;
  status: string;
  city: string;
};

export type GetSupplierResponse = SupplierResponse;

export type UpdateSupplierDto = {
  name?: string;
  brandTradeName?: string;
  supplierType?: string;
  minimumOrderQuantity?: number;
  leadTime?: string;
  deliveryMethod?: string;
  primaryContactName?: string;
  jobTitle?: string;
  department?: string;
  phoneNumber?: string;
  email?: string;
  physicalAddress?: string;
  mailingAddress?: string;
  emergencyContactName?: string;
  emergencyContactTitle?: string;
  emergencyContactNumber?: string;
  paymentType?: "Bank" | "Mobile Money";
  currency?: string;
  paymentTerms?: string;
  bankName?: string;
  accountType?: string;
  accountNumber?: string;
  provider?: "MTN" | "Vodafone" | "Airteltigo";
  mobileMoneyPhoneNumber?: string;
};

export enum ITEMS_STATUS {
  LOW = "LOW",
  STOCKED = "STOCKED",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export type ItemsDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  totalStock: number;
  status: ITEMS_STATUS;
  category: Pick<ItemCategoryResponse, "name" | "id">;
};

export type CreateItemDto = {
  name: string;
  brandName: string;
  costPrice?: number;
  sellingPrice?: number;
  dosageForm: string;
  code: string;
  fdaApproval: string;
  ISO: string;
  reorderPoint?: number;
  strength: string;
  unitOfMeasurement: string;
  manufacturer: string;
  categoryId: string;
  storageReq: string;
};

type Batch = {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemId: string;
  validity: string;
  batchNumber: string;
  quantity: number;
  createdBy: string;
  supplierId: string;
  deletedAt: string | null;
};

export type OneItem = {
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
  id: string;
  createdAt: string;
  updatedAt: string;
  totalStock: number;
  batches: Batch[];
};
export type CreateBatchDto = {
  batchNumber: string;
  quantity?: number;
  supplierId: string;
  validity: string;
  itemId: string;
};

export type OneBatch = {
  id: string;
  itemId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  manufacturingDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type BatchesNoPaginate = {
  id: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
};

export type BatchResponseDto = {
  id: string;
  batchNumber: string;
  quantity: number;
  supplier: IdData;
  createdAt: string;
  updatedAt: string;
  validity: string;
};

export type UpdateBatchDto = {
  batchNumber?: string;
  quantity?: number;
  expiryDate?: string;
  manufacturingDate?: string;
};

export type GetNoPaginateDto = {
  id: string;
  name: string;
  stockQuantity: number;
  status: "LOW" | "STOCKED" | "OUT_OF_STOCK";
};

export type ItemAnalytics = {
  id: string;
  totalSales: number;
  stockMovements: number;
  lowStockAlerts: number;
  lastUpdated: string;
};

export type ItemCounts = {
  totalItems: {
    count: number;
    changeType: "INCREASE" | "DECREASE";
    percentageDifference: number;
  };
  lowStocked: number;
  outOfStock: number;
  highStocked: number;
  totalStock: number;
};

export type UpdateItemDto = {
  name?: string;
  stockQuantity?: number;
  categoryId?: string;
  price?: number;
  sellingPrice?: number;
};

export type AdjustPriceDto = {
  price: number;
  sellingPrice?: number;
};

export type DeleteItemsDto = {
  ids: string[];
};

export enum ITEMS_CATEGORIES_STATUS {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
}
export type ItemCategoryResponse = {
  name: string;
  status: ITEMS_CATEGORIES_STATUS;
  itemCount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateItemsCategoryDto = {
  name: string;
};

export type UpdateItemCategoryDto = {
  name?: string;
};

export type ReportType =
  | "stock_level_report"
  | "stock_movement_report"
  | "low_stock_reorder_report"
  | "expiry_report"
  | "damage_loss_report"
  | "inventory_valuation_report"
  | "periodic_sales_report";

export type GetReportDto = {
  reportType: ReportType;
  name: string;
  nameInExport?: string;
  startDate?: string;
  endDate?: string;
  specificDate?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateReportDto = {
  reportType: ReportType;
  name: string;
  nameInExport?: string;
  startDate?: string;
  endDate?: string;
  specificDate?: string;
};

export type GetReportDataDto = {
  count: number;
  rows: unknown[];
};

export type UpdateReportDto = {
  reportType?: ReportType;
  name?: string;
  nameInExport?: string;
  startDate?: string;
  endDate?: string;
  specificDate?: string;
};

export type GetSalesItemsDto = {
  batchId: string;
  batchNumber: string;
  validity: string;
  quantity: number;
  item: {
    name: string;
    brandName: string;
    sellingPrice: number;
  };
};

export type CreateSaleItemsDto = {
  batchId: string;
  quantity: number;
};

export type CreateSaleResponseDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  paymentType: "CASH" | "ONLINE";
  saleItems: CreateSaleItemsDto[];
  notes?: string;
  patientId: string;
  saleNumber: string;
  status: "PAID" | "UNPAID";
  subTotal: number;
  total: number;
  departmentId: string;
  facilityId: string;
  deletedAt: string | null;
  deletedBy: string | null;
};

export type CreateSaleDto = {
  patientCardId?: string;
  paymentType: "CASH" | "ONLINE";
  saleItems: CreateSaleItemsDto[];
  notes?: string;
  patientId?: string;
  saleNumber?: string;
  status?: "PAID" | "UNPAID";
  subTotal?: number;
  total?: number;
};

export type GetSalesDto = {
  notes?: string;
  saleNumber: string;
  status: "PAID" | "UNPAID";
  total: number;
  id: string;
  createdAt: string;
  patient: {
    id: string;
    cardIdentificationNumber: string;
    name: string;
  };
  saleItem: GetSalesItemsDto;
  remainderItems: number;
  totalQuantity: number;
};

export type UpdateSalesDto = {
  patientCardId?: string;
  paymentType?: "CASH" | "ONLINE";
  saleItems?: CreateSaleItemsDto[];
  notes?: string;
};

export type GetSaleDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  paymentType: "CASH" | "ONLINE";
  notes?: string;
  saleNumber: string;
  status: "PAID" | "UNPAID";
  subTotal: number;
  total: number;
  departmentId: string;
  facilityId: string;
  patient: {
    id: string;
    cardIdentificationNumber: string;
    name: string;
  };
  saleItems: GetSalesItemsDto[];
};

export enum ItemRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

// Enums for Item Orders
export enum ItemOrderStatus {
  REQUESTED = "requested",
  DRAFT = "draft",
  CANCELLED = "cancelled",
  DELIVERING = "delivering",
  RECEIVED = "received",
}

// Enums for Stock Adjustments
export enum StockAdjustmentType {
  REDUCTION = "REDUCTION",
  INCREMENT = "INCREMENT",
}

export enum StockAdjustmentStatus {
  SUBMITTED = "SUBMITTED",
  ADJUSTED = "ADJUSTED",
  REJECTED = "REJECTED",
}

export type CreateDepartmentRequestDto = {
  itemId: string;
  quantity: number;
  additionalNotes: string;
};

export type GetItemRequestsResponseDto = {
  id: string;
  quantity: number;
  requestNumber: string;
  status: ItemRequestStatus;
  itemId: string;
  itemName: string;
  dateRequested: string;
};

export type GetSpecificRequestResponseDto = {
  id: string;
  quantity: number;
  additionalNotes?: string;
  status: ItemRequestStatus;
  item: IdData;
};

export type UpdateDepartmentRequestDto = {
  itemId?: string;
  quantity?: number;
  additionalNotes?: string;
};

// Types for Item Orders
export type CreateItemOrderDto = {
  id: string;
  createdAt: string;
  updatedAt: string;
  supplierId: string;
  itemId: string;
  quantity: number;
  orderNumber: string;
  status: ItemOrderStatus;
  expectedDeliveryDate?: string;
  notes?: string;
};

export type GetItemOrdersResponseDto = {
  id: string;
  orderNumber: string;
  status: ItemOrderStatus;
  supplier: IdData;
  item: IdData;
  quantity: number;
  expectedDeliveryDate?: string;
  createdAt: string;
  date: string;
};

export type GetItemOrderResponseDto = {
  id: string;
  orderNumber: string;
  status: ItemOrderStatus;
  supplierId: string;
  itemId: string;
  quantity: number;
  expectedDeliveryDate?: string;
  deliveryMethod: string;
  deliveryAddress: string;
  additionalNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateItemOrderDto = {
  supplierId?: string;
  itemId?: string;
  quantity?: number;
  expectedDeliveryDate?: string;
  notes?: string;
};

export type ChangeOrderStatusDto = {
  status: ItemOrderStatus;
};

// Types for Stock Adjustments
export type CreateStockAdjustmentDto = {
  itemId: string;
  batchId: string;
  quantity?: number;
  type: keyof typeof StockAdjustmentType;
  reason: string;
  notes?: string;
};

export type CreatedAdjustmentResponseDto = {
  id: string;
  itemId: string;
  quantity: number;
  type: StockAdjustmentType;
  reason: string;
  status: StockAdjustmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OneStockAdjustment = {
  id: string;
  item: IdData;
  batch: IdData;
  quantity: number;
  type: StockAdjustmentType;
  reason: string;
  status: StockAdjustmentStatus;
  notes?: string;
  createdAt: string;
  createdBy: string;
};

export type UpdateStockAdjustmentDto = {
  quantity?: number;
  reason?: string;
  notes?: string;
};

export type CreatePatientResponseDto = {
  name: string;
  cardIdentificationNumber: string;
  dateOfBirth: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
};

export type CreatePatientDto = {
  name: string;
  cardIdentificationNumber: string;
  dateOfBirth: string;
};

export type RetrievePatientsDto = {
  name: string;
  cardIdentificationNumber: string;
  id: string;
};

export type RetrievePatientDto = {
  name: string;
  cardIdentificationNumber: string;
  dateOfBirth: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
};

export type UpdatePatientDto = {
  name?: string;
  cardIdentificationNumber?: string;
  dateOfBirth?: string;
};

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

export type GetDepartmentRequestResponseDto = {
  id: string;
  quantity: number;
  requestNumber: string;
  status: RequestStatus;
  itemId: string;
  itemName: string;
  dateRequested: string;
  departmentId: string;
  departmentName: string;
};

export type UpdateRequestStatusDto = {
  status: RequestStatus;
};

export type CreateComplaintDto = {
  complaint: string;
};

export type HealthCheckResponse = {
  status: string;
  info?: Record<string, { status: string; [key: string]: unknown }>;
  error?: Record<
    string,
    { status: string; message?: string; [key: string]: unknown }
  >;
  details: Record<
    string,
    { status: string; message?: string; [key: string]: unknown }
  >;
};

export type PaginatedResponse<T> = {
  data: {
    rows: T[];
    total: number;
    pageSize: number;
    page: number;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
  };
  statusCode: number;
  message: string;
};

export type LogComplainDto = {
  feature: string;
  complaint: string;
  dateTimeIssueOccured: string;
  errorMessage?: string;
};
