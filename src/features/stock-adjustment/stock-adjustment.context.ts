import { createContext } from "react";
import { GetNoPaginateDto } from "../shared/types/action.types";

export const StockAdjustmentContext = createContext<{
  items: GetNoPaginateDto[];
}>({ items: [] });

export const StockAdjustmentProvider = StockAdjustmentContext.Provider;
