"use client";
import { getItems } from "@features/shared/actions/items.actions";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { ItemsDto, Pagination } from "@features/shared/types/action.types";
import { StockLevel } from "@features/shared/types/dashboard.types";
import { CacheKey } from "@/lib/cache/cache-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

type StockLevelItemsProps = {
  currentStockLevelView: Exclude<StockLevel, "STOCKED">;
  stockColor?: string;
  showSeeMoreLinkOnly?: boolean;
};

const StockLevelItems = ({
  currentStockLevelView,
  stockColor,
  showSeeMoreLinkOnly = false,
}: StockLevelItemsProps) => {
  const { data: stockItemsData } = useFetchData<Pagination<ItemsDto>>({
    fetchFn: () =>
      getItems({
        status: currentStockLevelView,
        pageSize: "5",
      }),
    cacheKey: CacheKey.DashboardStockItems,
    deps: [currentStockLevelView],
  });
  const stockItems = stockItemsData?.rows ?? [];

  if (showSeeMoreLinkOnly) {
    return stockItems.length > 0 ? (
      <Link
        className="hover:text-gray-600 hover:underline"
        href={`/items?status=${currentStockLevelView}`}
      >
        See more
      </Link>
    ) : null;
  }

  return stockItems.length > 0 ? (
    <div className="space-y-3">
      {stockItems.map(({ totalStock, name }) => (
        <div
          key={`${name}-${totalStock}`}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-x-2">
            <span className={cn("h-3.5 w-1.5 rounded-md", stockColor)}></span>
            <span className="text-gray-600">{name}</span>
          </div>
          <span className="font-medium text-[#111111]">{totalStock}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex h-24 items-center justify-center">
      <p className="text-sm text-gray-500">No items to display.</p>
    </div>
  );
};

export default StockLevelItems;
