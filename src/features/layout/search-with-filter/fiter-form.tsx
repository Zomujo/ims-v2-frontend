"use client";
import { PAGE_ROUTES } from "@/lib/constant";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { ItemsFilters } from "@features/items/items-filters";
import { ItemsBatchesFilters } from "@features/items/items-batches-filters";

export default function FilterForms() {
  const pathName = usePathname();
  const params = useParams();
  const itemId = params.slugs[0];

  const renderFilterForm = () => {
    return {
      [PAGE_ROUTES.SALES.VIEW]: <div>Sales</div>,
      [PAGE_ROUTES.ITEMS.VIEW]: <ItemsFilters />,
      [PAGE_ROUTES.ITEMS.BATCHES.replace(":itemId", itemId)]: (
        <ItemsBatchesFilters />
      ),
    };
  };

  return renderFilterForm()[pathName] ?? <div>FilterForms</div>;
}
