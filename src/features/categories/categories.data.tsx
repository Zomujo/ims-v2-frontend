import { cn, formateDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ItemCategoryResponse,
  ITEMS_CATEGORIES_STATUS,
} from "../shared/types/action.types";
import { Badge } from "../ui/badge";

export const itemCategoriesTableColumns: ColumnDef<ItemCategoryResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
              status === ITEMS_CATEGORIES_STATUS.ACTIVE,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === ITEMS_CATEGORIES_STATUS.DEACTIVATED,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "itemCount",
    header: "Category Items",
  },
];
