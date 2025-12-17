"use client";
import { usePathname } from "next/navigation";
import { PAGE_ROUTES } from "@/lib/constant";
import ImsSearchBar from "../shared/components/ims-search-bar";
import ImsFilters from "../shared/components/ims-filter";
import FilterForms from "@features/layout/search-with-filter/fiter-form";

const possibleFilterPages = [
  PAGE_ROUTES.SETTINGS.DEPARTMENTS,
  PAGE_ROUTES.SETTINGS.USERS,
] as const;

export const SettingsSearchWithFilter = () => {
  const pathName = usePathname();
  if (!possibleFilterPages.includes(pathName)) {
    return null;
  }
  return (
    <div className="flex w-full max-w-lg flex-wrap items-center gap-4">
      <ImsSearchBar />
      <ImsFilters>
        <FilterForms />
      </ImsFilters>
    </div>
  );
};

export default SettingsSearchWithFilter;
