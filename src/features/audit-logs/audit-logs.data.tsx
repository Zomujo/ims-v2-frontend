import { camelCaseToSentence, capitalize, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@features/shared/types/activity.types";

export const auditLogsTableColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => capitalize(row.original.action),
  },
  {
    accessorKey: "tableName",
    header: "Module Name",
    cell: ({ row }) => camelCaseToSentence(row.original.tableName),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => row.original.user.fullName,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => row.original.department?.name ?? "Central Admin",
  },
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
];
