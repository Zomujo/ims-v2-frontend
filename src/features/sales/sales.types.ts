import { UseFieldArrayRemove } from "react-hook-form";
import { SaleItem } from "../shared/types/sales-action.types";

export type SaleCardTypes = {
  salesItem: Partial<SaleItem> & { id: string };
  remove: UseFieldArrayRemove;
  index: number;
  quantity: number;
  onChange: (value: number) => void;
};
