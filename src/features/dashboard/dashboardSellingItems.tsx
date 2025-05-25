"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartTooltipContent,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "../ui/chart";
import { DATE_RANGE } from "../layout/search-with-filter/search-with-filter.data";
import { useEffect, useState } from "react";
import {
  getLeastSellingItems,
  getTopSellingItems,
} from "../shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "../shared/types/utitls.types";
import { TopLeastSellingItemsResponse } from "../shared/types/dashboard.types";
import { Loader2 } from "lucide-react";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";

type TopLeastChart = {
  items: string;
  desktop: number;
};
const topChartData: TopLeastChart[] = [];
const leastChartData: TopLeastChart[] = [];

const topSellingchartConfig = {
  desktop: {
    label: "Quantity sold",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardSellingItems() {
  const [selectedTopSellingDateRange, setselectedTopSellingDateRange] =
    useState<DATE_RANGE>(DATE_RANGE.THIS_YEAR);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLeastSellingDateRange, setselectedLeastSellingDateRange] =
    useState<DATE_RANGE>(DATE_RANGE.THIS_YEAR);
  const [isLeastItemsChartLoading, setIsLeastItemsChartLoading] =
    useState(false);

  useEffect(() => {
    async function fetchTopSellingItems() {
      setIsLoading(true);
      const {
        items: { names, quantities },
      } = (await getTopSellingItems({
        dateRange: selectedTopSellingDateRange as DateRangeQueryOptions,
      })) as TopLeastSellingItemsResponse;
      topChartData.length = 0;
      names.forEach((name, index) =>
        topChartData.push({ items: name, desktop: quantities[index] }),
      );
      setIsLoading(false);
    }
    void fetchTopSellingItems();
  }, [selectedTopSellingDateRange]);

  useEffect(() => {
    async function fetchLeastSellingItems() {
      setIsLeastItemsChartLoading(true);
      const {
        items: { names, quantities },
      } = (await getLeastSellingItems({
        dateRange: selectedLeastSellingDateRange as DateRangeQueryOptions,
      })) as TopLeastSellingItemsResponse;
      leastChartData.length = 0;
      names.forEach((name, index) =>
        leastChartData.push({ items: name, desktop: quantities[index] }),
      );
      setIsLeastItemsChartLoading(false);
    }
    void fetchLeastSellingItems();
  }, [selectedLeastSellingDateRange]);

  return (
    <div className="flex justify-between overflow-y-auto">
      <div className="w-[49%]">
        <DashboardBaseCard
          title="Top - selling items"
          selectedValue={selectedTopSellingDateRange}
          setSelectedValue={setselectedTopSellingDateRange}
        >
          {!isLoading ? (
            <ChartContainer config={topSellingchartConfig}>
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
          ) : (
            <div className="flex h-[20vw] items-center justify-center">
              <p className="flex gap-2">
                <Loader2 className="animate-spin" /> loading....
              </p>
            </div>
          )}
        </DashboardBaseCard>
      </div>
      <div className="w-[49%]">
        <DashboardBaseCard
          title="Low - selling items"
          selectedValue={selectedLeastSellingDateRange}
          setSelectedValue={setselectedLeastSellingDateRange}
        >
          {!isLeastItemsChartLoading ? (
            <ChartContainer config={topSellingchartConfig}>
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
          ) : (
            <div className="flex h-[20vw] items-center justify-center">
              <p className="flex gap-2">
                <Loader2 className="animate-spin" /> loading....
              </p>
            </div>
          )}
        </DashboardBaseCard>
      </div>
    </div>
  );
}
