import SearchWithFilter from "@/features/layout/search-with-filter/search-with-filter";
import React from "react";
import { IdProvider } from "@/lib/providers/id-context";

export default async function PagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <IdProvider>
      <div className="h-full rounded-2xl bg-white p-6">
        <SearchWithFilter />
        {children}
      </div>
    </IdProvider>
  );
}
