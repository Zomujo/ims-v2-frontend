"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/features/ui/chart";
import React, { useMemo, useState } from "react";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { getSellingCategories } from "@features/shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { Skeleton } from "../ui/skeleton";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { cn, generateColor } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { SellingCategoriesResponse } from "@features/shared/types/dashboard.types";
import { CacheKey } from "@/lib/cache/cache-data";

interface ChartData {
  name: string;
  quantity: number;
  fill: string;
}

export default function DashboardSellingCategories() {
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );
  const isMobile = useIsMobile("x-large-mobile");
  const { data: sellingCategoriesResponse, loading: isLoading } = useFetchData<
    SellingCategoriesResponse | undefined
  >({
    fetchFn: () =>
      getSellingCategories({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      }),
    cacheKey: CacheKey.DashboardSellingCategories,
    deps: [selectedDateRange],
  });

  const chartData = useMemo<ChartData[]>(() => {
    const categories = sellingCategoriesResponse?.topSelling?.categories;
    const quantities = sellingCategoriesResponse?.topSelling?.quantities;
    if (categories && quantities) {
      return categories.map((name, index) => ({
        name,
        quantity: quantities[index],
        fill: generateColor(index + 1, true, true),
      }));
    }
    return [];
  }, [sellingCategoriesResponse]);

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      name: {
        label: "Name",
      },
    };
    chartData.forEach((data, index) => {
      config[data.name] = {
        label: data.name,
        color: generateColor(index + 1, true, true),
      };
    });
    return config;
  }, [chartData]);

  return (
    <DashboardBaseCard
      noResults={!chartData.length}
      isLoading={isLoading}
      title="Top selling Categories"
      selectedValue={selectedDateRange}
      setSelectedValue={setSelectedDateRange}
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="flex h-[450px] w-full items-center justify-center gap-5 px-6">
            <div className="flex items-center justify-center">
              <Skeleton className="h-100 w-100 rounded-full" />
            </div>
            <div className="flex flex-wrap items-center justify-center space-x-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[450px] w-full max-w-4xl px-6"
        >
          <PieChart className="w-full" height={450}>
            <Pie
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              data={chartData}
              nameKey="name"
              dataKey="quantity"
            />
            <ChartLegend
              layout={isMobile ? "horizontal" : "vertical"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={isMobile ? "center" : "right"}
              content={
                <ChartLegendContent
                  nameKey="name"
                  className={cn(
                    !isMobile && "ml-4",
                    "flex-wrap justify-center",
                  )}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      )}
    </DashboardBaseCard>
  );
}
