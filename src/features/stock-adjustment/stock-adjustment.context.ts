import { createContext } from "react";
import { IdData } from "../shared/types/action.types";

export const StockAdjustmentContext = createContext<{
  items: IdData[];
}>({ items: [] });

export const StockAdjustmentProvider = StockAdjustmentContext.Provider;
