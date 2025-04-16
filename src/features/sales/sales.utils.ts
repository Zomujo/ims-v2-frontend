import { PAGE_ROUTES } from "@/lib/constant";

export const isSalesEditMode = (id?: string | string[]) => {
  const recordSalesParam = PAGE_ROUTES.SALES.RECORD.replace(
    PAGE_ROUTES.SALES.VIEW + "/",
    "",
  );
  return !!id && id !== recordSalesParam;
};
