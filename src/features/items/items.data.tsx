import { ColumnDef } from "@tanstack/react-table";
import {
  BatchResponseDto,
  ITEMS_STATUS,
  ItemsDto,
} from "../shared/types/action.types";
import { cn, formateDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

const statusText = {
  [ITEMS_STATUS.STOCKED]: "In Stock",
  [ITEMS_STATUS.LOW]: "Low Stock",
  [ITEMS_STATUS.OUT_OF_STOCK]: "Out of Stock",
};

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
          {statusText[status] ?? "N/A"}
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

export const dosageFormOptions = [
  { value: "TABLET", label: "Tablet" },
  { value: "INJECTION", label: "Injection" },
  { value: "SYRUP", label: "Syrup" },
  { value: "CAPSULE", label: "Capsule" },
  { value: "CREAM", label: "Cream" },
  { value: "OINTMENT", label: "Ointment" },
  { value: "LOTION", label: "Lotion" },
  { value: "GEL", label: "Gel" },
  { value: "SUSPENSION", label: "Suspension" },
  { value: "DROPS", label: "Drops" },
  { value: "SPRAY", label: "Spray" },
  { value: "POWDER", label: "Powder" },
  { value: "SUPPOSITORY", label: "Suppository" },
  { value: "INHALER", label: "Inhaler" },
  { value: "PATCH", label: "Patch" },
  { value: "LOZENGE", label: "Lozenge" },
  { value: "MOUTHWASH", label: "Mouthwash" },
  { value: "SHAMPOO", label: "Shampoo" },
];

export const FDAFormOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
];

export const prescriptionUnits = [
  { label: "Milligrams", value: "mg" },
  { label: "Grams", value: "g" },
  { label: "Micrograms", value: "mcg" },
  { label: "International Units", value: "IU" },
  { label: "Milliliters", value: "mL" },
  { label: "Liters", value: "L" },
  { label: "Units", value: "units" },
  { label: "Puffs", value: "puffs" },
  { label: "Drops", value: "gtt" },
  { label: "Tablets", value: "tablets" },
  { label: "Capsules", value: "capsules" },
  { label: "Teaspoons", value: "tsp" },
  { label: "Tablespoons", value: "tbsp" },
  { label: "Sprays", value: "sprays" },
  { label: "Patches", value: "patches" },
  { label: "Suppositories", value: "suppositories" },
  { label: "Ointment (percentage)", value: "%" },
  { label: "Cream (percentage)", value: "%" },
  { label: "Gel (percentage)", value: "%" },
  { label: "Fingertip Units", value: "FTU" },
];
