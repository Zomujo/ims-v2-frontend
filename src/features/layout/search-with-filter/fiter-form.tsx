"use client";
import { PAGE_ROUTES } from "@/lib/constant";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";
import Filters from "@features/layout/search-with-filter/filters";
import {
  adjustmentStatusFilter,
  adjustmentTypeFilter,
  categoriesFilter,
  categoriesStatusFilter,
  dateRangeFilter,
  itemStatusFilter,
  orderStatusFilter,
  salesStatusFilter,
  todaySalesFilters,
} from "@features/layout/search-with-filter/search-with-filter.data";
import { useCategories } from "@/hooks/useCategories";

export default function FilterForms() {
  const pathName = usePathname();
  const params = useParams();
  const itemId = params.slugs?.[0];
  const { categories } = useCategories();

  const categoryOptions = useMemo(
    () =>
      categories.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [categories],
  );

  const renderFilterForm = () => {
    return {
      [PAGE_ROUTES.SALES.VIEW]: <div>Sales</div>,
      [PAGE_ROUTES.ITEMS.VIEW]: (
        <Filters
          filters={[
            itemStatusFilter,
            { ...categoriesFilter, options: categoryOptions },
          ]}
        />
      ),
      [PAGE_ROUTES.ITEMS.BATCHES.replace(":itemId", itemId ?? "")]: (
        <Filters filters={[dateRangeFilter]} />
      ),
      [PAGE_ROUTES.STOCK_ADJUSTMENT.VIEW]: (
        <Filters
          filters={[
            dateRangeFilter,
            adjustmentTypeFilter,
            adjustmentStatusFilter,
          ]}
        />
      ),
      [PAGE_ROUTES.ITEM_ORDERS.VIEW]: (
        <Filters filters={[dateRangeFilter, orderStatusFilter]} />
      ),

      [PAGE_ROUTES.CATEGORIES.VIEW]: (
        <Filters filters={[dateRangeFilter, categoriesStatusFilter]} />
      ),
      [PAGE_ROUTES.SALES.VIEW]: (
        <Filters
          filters={[salesStatusFilter, dateRangeFilter, todaySalesFilters]}
        />
      ),
      [PAGE_ROUTES.SUPPLIERS.VIEW]: (
        <Filters filters={[dateRangeFilter, categoriesStatusFilter]} />
      ),
      [PAGE_ROUTES.SETTINGS.DEPARTMENTS]: (
        <Filters filters={[dateRangeFilter]} />
      ),
    };
  };

  return renderFilterForm()[pathName] ?? <div>FilterForms</div>;
}
