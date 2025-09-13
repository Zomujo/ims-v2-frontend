import ReportsList from "@/features/reports/reports-list";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export const dynamic = "force-static";

export default function page() {
  return (
    <PermissionProvider permission={PermissionModules.REPORTS}>
      <ReportsList />
    </PermissionProvider>
  );
}
