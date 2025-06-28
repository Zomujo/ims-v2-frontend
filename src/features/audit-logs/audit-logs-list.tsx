"use client";

import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { ScrollArea } from "../ui/scroll-area";
import { auditLogsTableColumns } from "@features/audit-logs/audit-logs.data";
import { getAuditLogs } from "@features/shared/actions/activity.actions";

export default function AuditLogsList() {
  const { data, loading } = useFetchData({ fetchFn: getAuditLogs });
  const auditLogs = data?.rows ?? [];
  const { state, isEditMode, handleRemoveQueryparam } = usePageCRUD({
    data: auditLogs,
  });

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="audit logs"
        data={auditLogs}
        modalAction={() => {}}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={"Audit Logs"}
        tableColumns={auditLogsTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        isLoading={loading}
        actions={() => []}
      ></CrudPage>
    </ScrollArea>
  );
}
