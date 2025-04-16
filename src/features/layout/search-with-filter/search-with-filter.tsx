"use client";
import { ButtonLink } from "@/features/shared/components/button-link";
import ImsFilters from "@/features/shared/components/ims-filter";
import ImsSearchBar from "@/features/shared/components/ims-search-bar";
import { PAGE_ROUTES } from "@/lib/constant";
import { useParams } from "next/navigation";
import React from "react";

export default function SearchWithFilter() {
  const params = useParams();

  if (params.id) return null;
  return (
    <div className="relative flex w-full items-center gap-x-4 px-4 pt-1.5">
      <ImsSearchBar />
      <ImsFilters>F</ImsFilters>
      <ButtonLink
        variant="imsPrimary"
        className="absolute top-1.5 right-0"
        href={{ pathname: PAGE_ROUTES.SALES.RECORD }}
      >
        Record New Sale
      </ButtonLink>
    </div>
  );
}
