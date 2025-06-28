import { AuthIMSUserProfile } from "@features/shared/types/auth-action.types";
import { Department as DepartmentType } from "@features/shared/types/settings-action.types";

export enum TableName {
  Department = "Department",
  User = "User",
  DepartmentRequest = "DepartmentRequest",
  Batch = "Batch",
  Item = "Item",
  Markup = "Markup",
  ItemCategory = "ItemCategory",
  StockAdjustment = "StockAdjustment",
  Supplier = "Supplier",
  ItemOrder = "ItemOrder",
  Patient = "Patient",
  Report = "Report",
  SaleItem = "SaleItem",
  Sale = "Sale",
}

export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface AuditLog {
  id: string;
  createdAt: string;
  updatedAt: string;
  action: ActionType;
  tableName: TableName;
  description: string;
  userId: string;
  user: Pick<AuthIMSUserProfile, "fullName" | "email" | "id">;
  departmentId?: string;
  department?: Pick<DepartmentType, "id" | "name">;
  recordId: string;
}
