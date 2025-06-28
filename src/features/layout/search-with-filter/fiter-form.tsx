"use client";
import { PAGE_ROUTES } from "@/lib/constant";
import { useParams, usePathname } from "next/navigation";
import React, { useMemo } from "react";
import Filters from "@features/layout/search-with-filter/filters";
import {
  actionsFilter,
  adjustmentStatusFilter,
  adjustmentTypeFilter,
  categoriesFilter,
  categoriesStatusFilter,
  dateRangeFilter,
  departmentsFilter,
  itemStatusFilter,
  moduleOptions,
  orderStatusFilter,
  requestStatusFilter,
  salesStatusFilter,
  todaySalesFilters,
  userRoleFilter,
  usersFilter,
  userStatusFilter,
  validityStatusFilter,
} from "@features/layout/search-with-filter/search-with-filter.data";
import { useCategories } from "@/hooks/useCategories";
import { useUsers } from "@/hooks/useUsers";
import { useDepartments } from "@/hooks/useDepartments";

export default function FilterForms() {
  const pathName = usePathname();
  const params = useParams();
  const itemId = params.slugs?.[0];
  const { users, loading: loadingUsers } = useUsers();
  const { categories, loading: loadingCategories } = useCategories();
  const { departments, loading: loadingDepartments } = useDepartments();

  const categoryOptions = useMemo(
    () =>
      categories.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [categories],
  );

  const userOptions = useMemo(
    () =>
      users.map(({ id, fullName }) => ({
        label: fullName,
        value: id,
      })),
    [users],
  );

  const departmentOptions = useMemo(
    () =>
      departments.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [departments],
  );

  const renderFilterForm = () => {
    return {
      [PAGE_ROUTES.SALES.VIEW]: <div>Sales</div>,
      [PAGE_ROUTES.ITEMS.VIEW]: (
        <Filters
          filters={[
            itemStatusFilter,
            {
              ...categoriesFilter,
              options: categoryOptions,
              isLoading: loadingCategories,
            },
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
      [PAGE_ROUTES.SETTINGS.USERS]: (
        <Filters
          filters={[dateRangeFilter, userStatusFilter, userRoleFilter]}
        />
      ),
      [PAGE_ROUTES.DEPARTMENTS_REQUESTS.VIEW]: (
        <Filters filters={[dateRangeFilter, requestStatusFilter]} />
      ),
      [PAGE_ROUTES.EXPIRY.VIEW]: (
        <Filters dateRangeFilter={true} filters={[validityStatusFilter]} />
      ),
      [PAGE_ROUTES.AUDIT_LOGS]: (
        <Filters
          dateRangeFilter={true}
          filters={[
            actionsFilter,
            { ...usersFilter, options: userOptions, isLoading: loadingUsers },
            moduleOptions,
            {
              ...departmentsFilter,
              options: departmentOptions,
              isLoading: loadingDepartments,
            },
          ]}
        />
      ),
    };
  };

  return renderFilterForm()[pathName] ?? <div>FilterForms</div>;
}
