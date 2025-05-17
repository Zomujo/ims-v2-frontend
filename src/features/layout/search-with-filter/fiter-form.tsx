"use client";
import { PAGE_ROUTES } from "@/lib/constant";
import { usePathname } from "next/navigation";
import React from "react";
import { ItemsFilters } from "@features/items/items-filters";

export default function FilterForms() {
  const pathName = usePathname();
  return renderFilterForm()[pathName] ?? <div>FilterForms</div>;
}

const renderFilterForm = () => {
  return {
    [PAGE_ROUTES.SALES.VIEW]: <div>Sales</div>,
    [PAGE_ROUTES.ITEMS.VIEW]: <ItemsFilters />,
  };
};
