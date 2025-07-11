import SearchWithFilter from "@/features/layout/search-with-filter/search-with-filter";
import React from "react";

export default async function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Disable stock card for now
    // <div className="max-[480px]:hidden">
    //   <ShowItemsDashboard>
    //     {hasItemsPermission ? <StockCard /> : null}
    //   </ShowItemsDashboard>
    // </div>
    <div className="h-full rounded-2xl bg-white p-6">
      <SearchWithFilter />
      {children}
    </div>
  );
}
