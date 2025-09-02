"use client";
import { getItemsExpiry } from "@features/shared/actions/items.actions";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import {
  ExpiryItemsDto,
  Pagination,
} from "@features/shared/types/action.types";
import { CacheKey } from "@/lib/cache/cache-data";
import { ItemsListSkeleton } from "./dashboardGeneral";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type ExpiringItemsListProps = {
  stockColor: string;
};

const ExpiringItemsList = ({ stockColor }: ExpiringItemsListProps) => {
  const { data: expiringItemsData, loading: isLoadingExpiring } = useFetchData<
    Pagination<ExpiryItemsDto>
  >({
    fetchFn: () =>
      getItemsExpiry({
        pageSize: "5",
        orderBy: "expiryDate",
        orderDirection: "ASC",
      }),
    cacheKey: CacheKey.DashboardExpiringItems,
  });
  const expiringItems = expiringItemsData?.rows ?? [];

  if (isLoadingExpiring) {
    return <ItemsListSkeleton />;
  }

  return (
    <>
      <div className="my-2 flex place-self-end self-end">
        {expiringItems.length > 0 && (
          <Link
            className="hover:text-gray-600 hover:underline"
            href={`/expiry`}
          >
            See more
          </Link>
        )}
      </div>
      {expiringItems.length > 0 ? (
        <div className="mt-2 mb-5 space-y-3">
          {expiringItems.map(({ item, validity, batchNumber }) => {
            const expiryDate = new Date(validity);
            const expiryToday = new Date();
            expiryToday.setHours(0, 0, 0, 0);

            const diffTime = expiryDate.getTime() - expiryToday.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const getTextColor = () => {
              if (diffDays < 0) {
                return "text-red-500";
              }
              if (diffDays <= 60) {
                return "text-orange-500";
              }
              return "text-[#111111]";
            };

            return (
              <div
                key={`${item.name}-${validity}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-x-2">
                  <span
                    className={cn("h-3.5 w-1.5 rounded-md", stockColor)}
                  ></span>
                  <span className="text-sm text-gray-600">
                    {item.name} ({batchNumber})
                  </span>
                </div>
                <span className={cn("text-xs font-medium", getTextColor())}>
                  {format(expiryDate, "LLL dd, y")}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-24 items-center justify-center">
          <p className="text-sm text-gray-500">No expiring items to display.</p>
        </div>
      )}
    </>
  );
};

export default ExpiringItemsList;
