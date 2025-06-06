import { ColumnDef } from "@tanstack/react-table";
import { ExpiryItemsDto, ValidityStatus } from "../shared/types/action.types";
import { cn, formateDate } from "@/lib/utils";
import { Badge } from "@features/ui/badge";

export const expiryItemsTableColumns: ColumnDef<ExpiryItemsDto>[] = [
  { header: "ITEM NAME", accessorKey: "item.name" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => {
      const status = original.status;
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status === ValidityStatus.SAFE,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === ValidityStatus.EXPIRED,
            "bg-orange-100 text-orange-800 [&_span]:bg-yellow-500":
              status === ValidityStatus.CRITICAL,
            "bg-gray-100 text-gray-800 [&_span]:bg-gray-500":
              status === ValidityStatus.APPROACHING,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    header: "EXPIRY DATE",
    accessorKey: "validity",
    cell: ({ row }) => {
      return formateDate(row.original.validity);
    },
  },
  { header: "TOTAL STOCK", accessorKey: "quantity" },
  { header: "Batch Number", accessorKey: "batchNumber" },
];
