import { createContext } from "react";
import { IdData } from "../shared/types/action.types";

export const ItemOrdersContext = createContext<{
  items: IdData[];
  suppliers: IdData[];
}>({
  items: [],
  suppliers: [],
});

export const ItemOrdersProvider = ItemOrdersContext.Provider;
