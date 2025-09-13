import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";
import AuditLogsList from "@features/audit-logs/audit-logs-list";

export const dynamic = "force-static";

export default function page() {
  return (
    <PermissionProvider permission={PermissionModules.REPORTS}>
      <AuditLogsList />
    </PermissionProvider>
  );
}
