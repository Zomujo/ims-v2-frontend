import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  Sale,
  SaleItem,
  SALES_STATUS,
} from "../shared/types/sales-action.types";
import { Badge } from "../ui/badge";

export const salesTableColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "patient.cardIdentificationNumber",
    header: "Patient ID",
    cell: ({ row }) => {
      const patientId = row.original.patient?.cardIdentificationNumber;
      return patientId ?? "N/A";
    },
  },
  {
    accessorKey: "saleNumber",
    header: "Sales #",
  },
  {
    header: "Item(s)",
    accessorKey: "saleItem.item.name",
    cell: ({ row, getValue }) => {
      const items = getValue() as string;
      const itemQuantity = row.original.totalQuantity;

      return (
        <span className="space-x-1 text-sm">
          <span>{items}</span>
          <span className="rounded-full bg-[#FEF3C7] p-1 text-xs">
            {itemQuantity}+
          </span>
        </span>
      );
    },
  },
  {
    header: "Total Amount",
    accessorKey: "total",
    cell: ({ row }) => {
      const total = row.original.total.toLocaleString("en-US", {
        style: "currency",
        currency: "GHC",
      });
      return total;
    },
  },
  {
    header: "Date Created",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status === SALES_STATUS.PAID,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === SALES_STATUS.UNPAID,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
];

export const salesItemsColumns: ColumnDef<SaleItem>[] = [
  {
    accessorKey: "name",
    header: "Item",
    cell: ({ row }) => {
      const itemName = row.original.item?.name;
      return itemName ?? "N/A";
    },
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "item.sellingPrice",
    header: "Selling Price (unit)",
    cell: ({ row }) => {
      const total = row.original.item.sellingPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "GHC",
      });
      return total;
    },
  },
  {
    accessorKey: "validity",
    header: "Expiry Date",
    cell: ({ row }) => {
      const date = new Date(row.original.validity);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
];

export const salesItemLocalStorageKey = "sales-items";
export const singleSale = "single-sale";
export const paymentTypeOptions = [
  { label: "Cash", value: "CASH" },
  { label: "Online", value: "ONLINE" },
];
