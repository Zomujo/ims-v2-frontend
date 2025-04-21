import { cn, formateDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  OneStockAdjustment,
  StockAdjustmentStatus,
} from "../shared/types/action.types";
import { Badge } from "../ui/badge";

export const stockAdjustmentTableColumns: ColumnDef<OneStockAdjustment>[] = [
  {
    accessorKey: "item.name",
    header: "Item",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => {
      return row.original.createdBy.split(",")[0] ?? "-";
    },
  },
  {
    accessorKey: "type",
    header: "Adjustment Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return formateDate(row.original.createdAt);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status === StockAdjustmentStatus.ADJUSTED,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === StockAdjustmentStatus.REJECTED,
            "bg-gray-100 text-gray-800 [&_span]:bg-gray-500":
              status === StockAdjustmentStatus.SUBMITTED,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
];
