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
  minimumOrderQuantity: number;
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
  city: string;
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

export type DeleteItemsDto = {
  ids: string[];
};

export type ItemCategoryResponse = {
  name: string;
  status: "ACTIVE" | "DEACTIVATED";
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

export type RequestStatus = "PENDING" | "ACCEPTED" | "DELIVERED" | "CANCELLED";

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

export type GetSpecificRequestResponseDto = {
  id: string;
  quantity: number;
  additionalNotes: string;
  status: RequestStatus;
  item: {
    id: string;
    name: string;
  };
};

export type CreateDepartmentRequestDto = {
  itemId: string;
  quantity: number;
  additionalNotes: string;
};

export type GetItemRequestsResponseDto = {
  id: string;
  quantity: number;
  requestNumber: string;
  status: "PENDING" | "ACCEPTED" | "DELIVERED" | "CANCELLED";
  itemId: string;
  itemName: string;
  dateRequested: string;
};

export type UpdateDepartmentRequestDto = {
  itemId?: string;
  quantity?: number;
  additionalNotes?: string;
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
