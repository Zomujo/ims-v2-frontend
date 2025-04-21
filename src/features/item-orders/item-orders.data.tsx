import { cn, formateDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetItemOrdersResponseDto,
  ItemOrderStatus,
} from "../shared/types/action.types";
import { Badge } from "../ui/badge";

export const itemOrdersTableColumns: ColumnDef<GetItemOrdersResponseDto>[] = [
  {
    accessorKey: "item.name",
    header: "Item",
  },
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      return formateDate(row.original.date);
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
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
              status === ItemOrderStatus.RECEIVED,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === ItemOrderStatus.CANCELLED,
            "bg-orange-100 text-orange-800 [&_span]:bg-yellow-500":
              status === ItemOrderStatus.DELIVERING,
            "bg-blue-100 text-blue-800 [&_span]:bg-blue-500":
              status === ItemOrderStatus.REQUESTED,
            "bg-gray-100 text-gray-800 [&_span]:bg-gray-500":
              status === ItemOrderStatus.DRAFT,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
];
