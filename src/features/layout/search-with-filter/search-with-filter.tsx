"use client";
import { ButtonLink } from "@/features/shared/components/button-link";
import ImsFilters from "@/features/shared/components/ims-filter";
import ImsSearchBar from "@/features/shared/components/ims-search-bar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, usePathname } from "next/navigation";
import FilterForms from "./fiter-form";
import { actionButtonData } from "./search-with-filter.data";
import { PAGE_ROUTES } from "@/lib/constant";
import { useSessionData } from "@/hooks/useSessionData";

export default function SearchWithFilter() {
  const params = useParams();
  const isSlugs = !!params.slugs;
  const pathName = usePathname();
  const { hasActionPermission } = useSessionData();
  const btnData =
    actionButtonData[isSlugs ? PAGE_ROUTES.ITEM_BATCHES : pathName];

  if (!btnData?.href) return null;
  const [pathname, query] = (btnData?.href ?? "").split("?");

  if (params.id) return null;
  return (
    <div className="relative flex w-full items-center gap-x-4 px-4 pt-1.5">
      <ImsSearchBar />
      <ImsFilters>
        <FilterForms />
      </ImsFilters>
      {!pathName.includes(PAGE_ROUTES.REPORTS) &&
        hasActionPermission(btnData.permission ?? "") && (
          <ButtonLink
            variant="imsPrimary"
            className="absolute top-1.5 right-0"
            href={{ pathname, query }}
            startIcon={<Icon icon={btnData.icon} />}
          >
            {btnData.label}
          </ButtonLink>
        )}
    </div>
  );
}
