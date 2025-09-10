import { ColumnDef } from "@tanstack/react-table";
import { OneStockAdjustment } from "../shared/types/action.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@features/ui/tooltip";
import { NotebookText } from "lucide-react";

export const stockAdjustmentTableColumns: ColumnDef<OneStockAdjustment>[] = [
  {
    accessorKey: "item.name",
    header: "Item",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row: { original } }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <NotebookText />
          </TooltipTrigger>
          <TooltipContent>{original.notes}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => row.original.createdBy.fullName,
  },
  {
    accessorKey: "type",
    header: "Adjustment Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
