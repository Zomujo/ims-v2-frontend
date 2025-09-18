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
    header: "NHIS",
    accessorKey: "markup",
    cell: ({ row }) => {
      const markup = row.original.markup;
      return markup ? "Yes" : "No";
    },
  },
  {
    header: "CREATED AT",
    accessorKey: "createdAt",
    cell: ({ row }) => formateDate(row.original.createdAt),
  },
];

export const dosageFormOptions = [
  { value: "CAPSULE", label: "Capsule" },
  { value: "CREAM", label: "Cream" },
  { value: "DROPS", label: "Drops" },
  { value: "GEL", label: "Gel" },
  { value: "INHALER", label: "Inhaler" },
  { value: "INJECTION", label: "Injection" },
  { value: "LOTION", label: "Lotion" },
  { value: "LOZENGE", label: "Lozenge" },
  { value: "MOUTHWASH", label: "Mouthwash" },
  { value: "OINTMENT", label: "Ointment" },
  { value: "PATCH", label: "Patch" },
  { value: "POWDER", label: "Powder" },
  { value: "SHAMPOO", label: "Shampoo" },
  { value: "SPRAY", label: "Spray" },
  { value: "SUPPOSITORY", label: "Suppository" },
  { value: "SUSPENSION", label: "Suspension" },
  { value: "SYRUP", label: "Syrup" },
  { value: "TABLET", label: "Tablet" },
];

export const FDAFormOptions = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
];

export const prescriptionUnits = [
  { label: "amp – Ampoule(s)", value: "ampoules" },
  { label: "box – Box(es)", value: "boxes" },
  { label: "bottle – Bottle(s)", value: "bottles" },
  { label: "can – Canister(s)", value: "canisters" },
  { label: "cap – Capsule(s)", value: "capsules" },
  { label: "cream% – Cream (percentage)", value: "cream_%" },
  { label: "dose – Dose(s)", value: "doses" },
  { label: "FTU – Fingertip Units", value: "FTU" },
  { label: "gel% – Gel (percentage)", value: "gel_%" },
  { label: "g – Gram(s)", value: "g" },
  { label: "gtt – Drop(s)", value: "gtt" },
  { label: "inh – Inhaler(s)", value: "inhalers" },
  { label: "IU – International Units", value: "IU" },
  { label: "jar – Jar(s)", value: "jars" },
  { label: "L – Liters", value: "L" },
  { label: "loz – Lozenge(s)", value: "lozenges" },
  { label: "mcg – Micrograms", value: "mcg" },
  { label: "mg – Milligrams", value: "mg" },
  { label: "mL – Millilitre(s)", value: "mL" },
  { label: "pack – Pack(s)", value: "packs" },
  { label: "pes – Pessary/ies", value: "pessaries" },
  { label: "puff – Puff(s)", value: "puffs" },
  {
    label: "rec-bottle – Reconstituted Bottle(s)",
    value: "reconstituted_bottles",
  },
  { label: "sachet – Sachet(s)", value: "sachets" },
  { label: "spray – Sprays", value: "sprays" },
  { label: "strip – Strip(s)", value: "strips" },
  { label: "supp – Suppository/ies", value: "suppositories" },
  { label: "tab – Tablet(s)", value: "tablets" },
  { label: "tbsp – Tablespoon(s)", value: "tbsp" },
  { label: "tube – Tube(s)", value: "tubes" },
  { label: "tsp – Teaspoon(s)", value: "tsp" },
  { label: "U – Units", value: "units" },
  { label: "vial – Vial(s)", value: "vials" },
  { label: "ointment% – Ointment (percentage)", value: "ointment_%" },
];
