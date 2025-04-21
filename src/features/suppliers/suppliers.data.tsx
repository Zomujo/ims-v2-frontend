import { cn, formateDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetSuppliersResponse,
  ITEMS_CATEGORIES_STATUS,
} from "../shared/types/action.types";
import { Badge } from "../ui/badge";

export const suppliersTableColumns: ColumnDef<GetSuppliersResponse>[] = [
  {
    accessorKey: "name",
    header: "Supplier",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return formateDate(row.original.createdAt);
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status.length === ITEMS_CATEGORIES_STATUS.ACTIVE.length,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status.length === ITEMS_CATEGORIES_STATUS.DEACTIVATED.length,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
];
