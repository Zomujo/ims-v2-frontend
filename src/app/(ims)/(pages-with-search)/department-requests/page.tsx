import DepartmentRequestList from "@/features/department-request/department-request-list";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default async function page() {
  return (
    <PermissionProvider permission={PermissionModules.DEPARTMENT_REQUESTS}>
      <DepartmentRequestList />
    </PermissionProvider>
  );
}
