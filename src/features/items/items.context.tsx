import { createContext } from "react";
import { ItemCategoryResponse } from "../shared/types/action.types";

export const ItemsContext = createContext<{
  categories?: ItemCategoryResponse[];
}>({
  categories: [],
});

export const ItemsContextProvider = ItemsContext.Provider;
