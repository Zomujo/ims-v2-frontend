import { ColumnDef } from "@tanstack/react-table";
import {
  BatchResponseDto,
  ITEMS_STATUS,
  ItemsDto,
} from "../shared/types/action.types";
import { cn, formateDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const itemsTableColumns: ColumnDef<ItemsDto>[] = [
  { header: "ITEM NAME", accessorKey: "name" },
  {
    header: "CATEGORY",
    accessorKey: "category.name",
    cell: ({ row }) => {
      const category = row.original.category?.name;
      return (
        <span className="rounded-full bg-gray-200 p-2">
          {category ?? "N/A"}
        </span>
      );
    },
  },
  {
    header: "Total STOCK",
    accessorKey: "totalStock",
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status === ITEMS_STATUS.STOCKED,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === ITEMS_STATUS.LOW,
            "bg-red-100 text-gray-800 [&_span]:bg-gray-500":
              status === ITEMS_STATUS.OUT_OF_STOCK,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
  { header: "REORDER POINT", accessorKey: "reorderPoint" },
];
export const itemBatchesTableColumns: ColumnDef<BatchResponseDto>[] = [
  { header: "BATCH NUMBER", accessorKey: "batchNumber" },
  { header: "QUANTITY", accessorKey: "quantity" },
  { header: "SUPPLIER", accessorKey: "supplier.name" },
  {
    header: "Validity",
    accessorKey: "validity",
    cell: ({ row }) => formateDate(row.original.validity),
  },
  {
    header: "CREATED AT",
    accessorKey: "createdAt",
    cell: ({ row }) => formateDate(row.original.createdAt),
  },
];
