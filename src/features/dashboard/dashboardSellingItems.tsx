"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { CardTitle, Card, CardContent, CardHeader } from "../ui/card";
import {
  ChartTooltipContent,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "../ui/chart";
import { ImsSelect } from "../shared/components/ims-select";
import {
  DATE_RANGE,
  dateRangeOptions,
} from "../layout/search-with-filter/search-with-filter.data";
import { useEffect, useState } from "react";
import {
  getLeastSellingItems,
  getTopSellingItems,
} from "../shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "../shared/types/utitls.types";
import { TopLeastSellingItemsResponse } from "../shared/types/dashboard.types";
import { Loader2 } from "lucide-react";

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
    useState<DateRangeQueryOptions>(DATE_RANGE.THIS_YEAR);
  const [isLoading, setIsLoading] = useState(false);
  const [, ...acceptedDateRange] = dateRangeOptions;

  const [selectedLeastSellingDateRange, setselectedLeastSellingDateRange] =
    useState<DateRangeQueryOptions>(DATE_RANGE.THIS_YEAR);
  const [isLeastItemsChartLoading, setIsLeastItemsChartLoading] =
    useState(false);

  useEffect(() => {
    async function fetchTopSellingItems() {
      setIsLoading(true);
      const {
        items: { names, quantities },
      } = (await getTopSellingItems({
        dateRange: selectedTopSellingDateRange,
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
        dateRange: selectedLeastSellingDateRange,
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
      <div className="mt-4 w-[49%]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top - selling items</CardTitle>
              <div className="max-w-3xs">
                <ImsSelect
                  options={acceptedDateRange}
                  value={selectedTopSellingDateRange}
                  onChange={(dateRange) =>
                    setselectedTopSellingDateRange(
                      dateRange as DateRangeQueryOptions,
                    )
                  }
                  moduleName="Date Range"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                  <Loader2  className="animate-spin"/> loading....
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 w-[49%]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Low - selling items</CardTitle>
              <div className="max-w-3xs">
                <ImsSelect
                  options={acceptedDateRange}
                  value={selectedLeastSellingDateRange}
                  onChange={(dateRange) =>
                    setselectedLeastSellingDateRange(
                      dateRange as DateRangeQueryOptions,
                    )
                  }
                  moduleName="Date Range"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                  <Loader2 className="animate-spin"/> loading....
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
