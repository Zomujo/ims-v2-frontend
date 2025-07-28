"use client";
import { ButtonLink } from "@/features/shared/components/button-link";
import ImsFilters from "@/features/shared/components/ims-filter";
import ImsSearchBar from "@/features/shared/components/ims-search-bar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import FilterForms from "./fiter-form";
import {
  actionButtonData,
  exportActionButtonData,
} from "./search-with-filter.data";
import { PAGE_ROUTES } from "@/lib/constant";
import { useSessionData } from "@/hooks/useSessionData";
import { UserRole } from "@features/shared/types/auth-action.types";
import React, { useCallback, useState } from "react";
import { ImsButton } from "@features/shared/components/ims-button";
import { exportFile } from "@features/shared/actions/export.actions";
import { ImsPopover } from "@features/shared/components/ims-popover";
import { ExportType } from "@features/shared/types/utitls.types";

export default function SearchWithFilter() {
  const [exporting, setExporting] = useState<ExportType | null>(null);
  const params = useParams();
  const isSlugs = !!params.slugs;
  const pathName = usePathname();
  const { hasActionPermission, role } = useSessionData();
  const searchParams = useSearchParams();
  const btnData =
    actionButtonData[isSlugs ? PAGE_ROUTES.ITEM_BATCHES : pathName];
  const exportBtnData =
    exportActionButtonData[isSlugs ? PAGE_ROUTES.ITEM_BATCHES : pathName];

  const checkRole = useCallback(
    (roles: UserRole[] | undefined) => {
      if (!role) return false;
      if (!roles?.length) return true;
      return roles.includes(role);
    },
    [role],
  );

  if (!btnData) return null;
  const [pathname, query] = (btnData?.href ?? "").split("?");

  const downloadFile = async (exportType: ExportType) => {
    const queryParams = Object.fromEntries(searchParams.entries());

    if (exportBtnData?.endpoint) {
      setExporting(exportType);
      try {
        const blob = await exportFile(exportBtnData.endpoint, {
          ...queryParams,
          exportType,
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        const now = new Date();
        const timestamp = now
          .toISOString()
          .replace(/[:.]/g, "-")
          .split("T")
          .join("_")
          .slice(0, 19);
        link.download = `Stealth_${searchParams.get("exportFileName") || exportBtnData.fileName}_${timestamp}.${exportType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      } catch (err) {
        console.error("Download failed:", err);
      } finally {
        setExporting(null);
      }
    }
  };

  if (params.id) return null;

  return (
    <div className="flex items-center gap-4 px-4 pt-1.5 max-xl:flex-wrap">
      {!btnData.hideSearch && <ImsSearchBar />}
      <div className="flex w-full flex-wrap justify-between gap-4">
        {!btnData.hideFilters && (
          <ImsFilters>
            <FilterForms />
          </ImsFilters>
        )}
        <div className="z-50 ml-auto flex items-center gap-2">
          {btnData.href &&
            !pathName.includes(PAGE_ROUTES.REPORTS) &&
            hasActionPermission(btnData.permission ?? "") &&
            checkRole(btnData.roles) && (
              <ButtonLink
                variant="imsPrimary"
                href={{ pathname, query }}
                startIcon={<Icon icon={btnData.icon} />}
              >
                {btnData.label}
              </ButtonLink>
            )}
          {exportBtnData && (
            <ImsPopover
              triggerProps={{ asChild: true }}
              trigger={
                <ImsButton startIcon={<Icon icon={exportBtnData.icon} />}>
                  {exportBtnData.label}
                </ImsButton>
              }
            >
              <ImsButton
                disabled={!!exporting}
                isLoading={exporting === "csv"}
                onClick={() => downloadFile("csv")}
                variant="outline"
              >
                Export CSV
              </ImsButton>
              <ImsButton
                disabled={!!exporting}
                isLoading={exporting === "xlsx"}
                onClick={() => downloadFile("xlsx")}
                variant="outline"
              >
                Export XLSX
              </ImsButton>
            </ImsPopover>
          )}
        </div>
      </div>
    </div>
  );
}
