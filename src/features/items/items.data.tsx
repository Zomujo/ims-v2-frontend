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
  { header: "ITEM NAME", accessorKey: "itemFullName" },
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
    header: "NHIS Markup",
    accessorKey: "markup",
    cell: ({ row }) => {
      const markup = row.original.markup;
      return markup
        ? `${markup.amountType === "price" ? "GHC " : ""}${markup.amount}${markup.amountType === "percentage" ? "%" : ""}`
        : "N/A";
    },
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
  // Solid Dosage Units
  { label: "Tablet(s)", value: "tablets" },
  { label: "Capsule(s)", value: "capsules" },
  { label: "Strip(s)", value: "strips" },
  { label: "Pack(s)", value: "packs" },
  { label: "Box(es)", value: "boxes" },
  { label: "Suppository/ies", value: "suppositories" },
  { label: "Lozenge(s)", value: "lozenges" },
  { label: "Pessary/ies", value: "pessaries" },

  // Liquid Dosage Units
  { label: "Millilitre(s)", value: "mL" },
  { label: "Teaspoon(s)", value: "tsp" },
  { label: "Tablespoon(s)", value: "tbsp" },
  { label: "Dose(s)", value: "doses" },
  { label: "Bottle(s)", value: "bottles" },
  { label: "Drop(s)", value: "gtt" }, // medical abbreviation for drops
  { label: "Vial(s)", value: "vials" },
  { label: "Ampoule(s)", value: "ampoules" },

  // Semi-Solid Units
  { label: "Gram(s)", value: "g" },
  { label: "Tube(s)", value: "tubes" },
  { label: "Jar(s)", value: "jars" },

  // Inhalation/Nebulisation Units
  { label: "Puff(s)", value: "puffs" },
  { label: "Inhaler(s)", value: "inhalers" },
  { label: "Canister(s)", value: "canisters" },

  // Powdered/Granular Units
  { label: "Sachet(s)", value: "sachets" },
  { label: "Reconstituted Bottle(s)", value: "reconstituted_bottles" },

  // Other Common Units
  { label: "Milligrams", value: "mg" },
  { label: "Micrograms", value: "mcg" },
  { label: "International Units", value: "IU" },
  { label: "Liters", value: "L" },
  { label: "Units", value: "units" },
  { label: "Sprays", value: "sprays" },

  // Topical Application Units (Percentage-based)
  { label: "Ointment (percentage)", value: "ointment_%" },
  { label: "Cream (percentage)", value: "cream_%" },
  { label: "Gel (percentage)", value: "gel_%" },

  // Other
  { label: "Fingertip Units", value: "FTU" },
];
