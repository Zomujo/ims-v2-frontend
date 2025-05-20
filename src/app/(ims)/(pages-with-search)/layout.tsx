import { ShowItemsDashboard } from "@/features/items/items-component-client";
import StockCard from "@/features/items/items-component-server";
import SearchWithFilter from "@/features/layout/search-with-filter/search-with-filter";
import React from "react";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PermissionProvider permission={PermissionModules.ITEMS}>
        <ShowItemsDashboard>
          <StockCard />
        </ShowItemsDashboard>
      </PermissionProvider>
      <div className="h-[95%] rounded-2xl bg-white p-6">
        <SearchWithFilter />
        {children}
      </div>
    </>
  );
}
