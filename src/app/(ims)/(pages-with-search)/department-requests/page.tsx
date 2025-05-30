import DepartmentRequestList from "@/features/department-request/department-request-list";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";
import { checkServerPermission } from "@/lib/providers/server-permission-provider";
import { getItemsNoPaginate } from "@features/shared/actions/items.actions";

export default async function page() {
  const hasPermission = await checkServerPermission(
    PermissionModules.DEPARTMENT_REQUESTS,
  );

  if (!hasPermission) {
    return (
      <PermissionProvider permission={PermissionModules.DEPARTMENT_REQUESTS}>
        <div>This content will never be shown</div>
      </PermissionProvider>
    );
  }

  const items = await getItemsNoPaginate();
  return <DepartmentRequestList items={items ?? []} />;
}
