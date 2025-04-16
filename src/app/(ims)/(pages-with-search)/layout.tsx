import SearchWithFilter from "@/features/layout/search-with-filter/search-with-filter";
import React from "react";

export default function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[95%] rounded-2xl bg-white p-6">
      <SearchWithFilter />
      {children}
    </div>
  );
}
