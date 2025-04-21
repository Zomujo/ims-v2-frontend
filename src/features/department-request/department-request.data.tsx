import { ColumnDef } from "@tanstack/react-table";
import {
  GetDepartmentRequestResponseDto,
  RequestStatus,
} from "../shared/types/action.types";
import { Badge } from "../ui/badge";
import { cn, formateDate } from "@/lib/utils";

export const departmentRequestListTableColumns: ColumnDef<GetDepartmentRequestResponseDto>[] =
  [
    {
      accessorKey: "departmentName",
      header: "Department Name",
    },
    {
      accessorKey: "requestNumber",
      header: "Request Number",
    },
    {
      accessorKey: "itemName",
      header: "Item Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "dateRequested",
      header: "Request Date",
      cell: ({ row }) => {
        return formateDate(row.original.dateRequested);
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
                status === RequestStatus.ACCEPTED,
              "bg-red-100 text-red-800 [&_span]:bg-red-500":
                status === RequestStatus.CANCELLED,
              "bg-orange-100 text-orange-800 [&_span]:bg-yellow-500":
                status === RequestStatus.PENDING,
              "bg-blue-100 text-blue-800 [&_span]:bg-blue-500":
                status === RequestStatus.DELIVERED,
            })}
          >
            <span className="h-1.5 w-1.5 rounded-full"></span>
            {status}
          </Badge>
        );
      },
    },
  ];
