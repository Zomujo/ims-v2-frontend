import SuppliersList from "@/features/suppliers/suppliers-list";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default function page() {
  return (
    <PermissionProvider permission={PermissionModules.SUPPLIERS}>
      <SuppliersList />
    </PermissionProvider>
  );
}
