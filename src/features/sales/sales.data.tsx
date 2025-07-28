import { ColumnDef } from "@tanstack/react-table";
import { GetSalesDto } from "../shared/types/action.types";
import { SaleItem } from "../shared/types/sales-action.types";

export const salesTableColumns: ColumnDef<GetSalesDto>[] = [
  {
    accessorKey: "patient.cardIdentificationNumber",
    header: "NHIS ID",
    cell: ({ row }) => {
      const patientId = row.original.patient?.cardIdentificationNumber;
      return patientId ?? "N/A";
    },
  },
  {
    header: "Item(s)",
    accessorKey: "saleItem.item.name",
    cell: ({ row, getValue }) => {
      const items = getValue() as string;
      const remainderItems = row.original.remainderItems;

      return (
        <span className="space-x-1 text-sm">
          <span>{items}</span>
          {remainderItems > 0 ? (
            <span className="rounded-full bg-[#FEF3C7] p-1 text-xs">
              {remainderItems}+
            </span>
          ) : null}
        </span>
      );
    },
  },
  {
    header: "Total Amount",
    accessorKey: "total",
    cell: ({ row }) => {
      return row.original.total.toLocaleString("en-US", {
        style: "currency",
        currency: "GHC",
      });
    },
  },
  {
    header: "Payment Type",
    accessorKey: "status",
    cell: ({ row }) => {
      const paymentType = row.original.paymentType;
      return paymentType.join(", ");
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
    header: "Unit Price",
    cell: ({ row }) => {
      return row.original.item.sellingPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "GHC",
      });
    },
  },
  {
    header: "NHIS",
    accessorKey: "markup",
    cell: ({ row }) => {
      const markup = row.original.markup;
      return markup ? "Yes" : "No";
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
  { label: "NHIS", value: "NHIS" },
];

export const hasInsuranceOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];
