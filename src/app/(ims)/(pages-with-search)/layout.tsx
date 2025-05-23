import { ShowItemsDashboard } from "@/features/items/items-component-client";
import StockCard from "@/features/items/items-component-server";
import SearchWithFilter from "@/features/layout/search-with-filter/search-with-filter";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { checkServerPermission } from "@/lib/providers/server-permission-provider";

export default async function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasItemsPermission = await checkServerPermission(
    PermissionModules.ITEMS,
  );
  return (
    <>
      <ShowItemsDashboard>
        {hasItemsPermission ? <StockCard /> : null}
      </ShowItemsDashboard>
      <div className="h-[95%] rounded-2xl bg-white p-6">
        <SearchWithFilter />
        {children}
      </div>
    </>
  );
}
