import { UseFieldArrayRemove } from "react-hook-form";
import { SaleItem } from "../shared/types/sales-action.types";
import { salesCartSchema } from "@features/sales/sales.schemas";
import z from "zod";

export type SaleCartFormData = z.infer<typeof salesCartSchema>;

export type SaleCardTypes = {
  salesItem: Partial<SaleItem> & { id: string };
  remove: UseFieldArrayRemove;
  index: number;
  quantity: number;
  onChange: (value: number) => void;
};
