"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartTooltipContent,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "../ui/chart";
import { DATE_RANGE } from "../layout/search-with-filter/search-with-filter.data";
import { useMemo, useState } from "react";
import {
  getLeastSellingItems,
  getTopSellingItems,
} from "../shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "../shared/types/utitls.types";
import { SellingItemsResponse } from "../shared/types/dashboard.types";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { CacheKey } from "@/lib/cache/cache-data";

type TopLeastChart = {
  items: string;
  desktop: number;
};

const topSellingChartConfig = {
  desktop: {
    label: "Quantity sold",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardSellingItems() {
  const [selectedTopSellingDateRange, setSelectedTopSellingDateRange] =
    useState<DATE_RANGE>(DATE_RANGE.THIS_MONTH);

  const [selectedLeastSellingDateRange, setSelectedLeastSellingDateRange] =
    useState<DATE_RANGE>(DATE_RANGE.THIS_MONTH);

  const { data: topSellingData, loading: isLoading } = useFetchData<
    SellingItemsResponse | undefined
  >({
    fetchFn: () =>
      getTopSellingItems({
        dateRange: selectedTopSellingDateRange as DateRangeQueryOptions,
      }),
    cacheKey: CacheKey.DashboardTopSellingItems,
    deps: [selectedTopSellingDateRange],
  });

  const topChartData = useMemo(() => {
    const data: TopLeastChart[] = [];
    const names = topSellingData?.items?.names;
    const quantities = topSellingData?.items?.quantities;
    if (names && quantities) {
      names.forEach((name, index) =>
        data.push({ items: name, desktop: quantities[index] }),
      );
    }
    return data;
  }, [topSellingData]);

  const { data: leastSellingData, loading: isLeastItemsChartLoading } =
    useFetchData<SellingItemsResponse | undefined>({
      fetchFn: () =>
        getLeastSellingItems({
          dateRange: selectedLeastSellingDateRange as DateRangeQueryOptions,
        }),
      cacheKey: CacheKey.DashboardLeastSellingItems,
      deps: [selectedLeastSellingDateRange],
    });

  const leastChartData = useMemo(() => {
    const data: TopLeastChart[] = [];
    const names = leastSellingData?.items?.names;
    const quantities = leastSellingData?.items?.quantities;
    if (names && quantities) {
      names.forEach((name, index) =>
        data.push({ items: name, desktop: quantities[index] }),
      );
    }
    return data;
  }, [leastSellingData]);

  return (
    <div className="flex flex-col justify-between overflow-y-auto xl:flex-row">
      <div className="w-full xl:w-[49%]">
        <DashboardBaseCard
          noResults={!topChartData.length}
          isLoading={isLoading}
          noResultsHeight="20vw"
          title="Top - selling items"
          selectedValue={selectedTopSellingDateRange}
          setSelectedValue={setSelectedTopSellingDateRange}
        >
          {!isLoading ? (
            <>
              <ChartContainer config={topSellingChartConfig}>
                <BarChart
                  accessibilityLayer
                  data={topChartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="items"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="#3FC8E4" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="flex items-center justify-center">
                <Link
                  className="mx-auto hover:text-gray-600 hover:underline"
                  href={`/reports#top-selling`}
                >
                  See more
                </Link>
              </div>
            </>
          ) : (
            <div className="flex h-[20vw] items-center justify-center">
              <div className="flex rotate-180 gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`h-[15vw] w-[100px] animate-pulse`}
                  />
                ))}
              </div>
            </div>
          )}
        </DashboardBaseCard>
      </div>
      <div className="w-full xl:w-[49%]">
        <DashboardBaseCard
          noResults={!leastChartData.length}
          isLoading={isLeastItemsChartLoading}
          noResultsHeight="20vw"
          title="Low - selling items"
          selectedValue={selectedLeastSellingDateRange}
          setSelectedValue={setSelectedLeastSellingDateRange}
        >
          {!isLeastItemsChartLoading ? (
            <>
              <ChartContainer config={topSellingChartConfig}>
                <BarChart
                  accessibilityLayer
                  data={leastChartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="items"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="#FF6E66" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="flex items-center justify-center">
                <Link
                  className="mx-auto hover:text-gray-600 hover:underline"
                  href={`/reports`}
                >
                  See more
                </Link>
              </div>
            </>
          ) : (
            <div className="flex h-[20vw] items-center justify-center">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`h-[15vw] w-[100px] animate-pulse`}
                  />
                ))}
              </div>
            </div>
          )}
        </DashboardBaseCard>
      </div>
    </div>
  );
}
