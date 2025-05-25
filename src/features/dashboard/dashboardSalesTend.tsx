"use client";

import { ChevronDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/features/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@features/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Button } from "@features/ui/button";
import {
  DATE_RANGE,
  dateRangeFilter,
} from "@features/layout/search-with-filter/search-with-filter.data";
import { getSalesTrend } from "@features/shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Sales Trend",
    color: "#42B8FF",
  },
} satisfies ChartConfig;

interface ChartData {
  date: string;
  quantity: number;
}

export default function DashboardSalesTrend() {
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSalesTrend = async () => {
      setIsLoading(true);
      const salesTrendResponse = await getSalesTrend({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      });
      if (salesTrendResponse) {
        const { dates, quantities } = salesTrendResponse.trend;
        const convertedData = dates.map((date, index) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          return {
            date: formattedDate,
            quantity: quantities[index],
          };
        });

        setChartData(convertedData);
      }
      setIsLoading(false);
    };
    void fetchSalesTrend();
  }, [selectedDateRange]);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="text-2xl font-bold">Sales Trend</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>
                  {dateRangeFilter.options.find(
                    ({ value }) => value === selectedDateRange,
                  )?.label || ""}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuRadioGroup
                value={selectedDateRange}
                onValueChange={(value) =>
                  setSelectedDateRange(value as DATE_RANGE)
                }
              >
                {dateRangeFilter.options
                  .slice(1)
                  .map(({ value, label: radioLabel }) => (
                    <DropdownMenuRadioItem
                      key={value}
                      value={value}
                      className="cursor-pointer"
                    >
                      {radioLabel}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[450px] w-full rounded-lg" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ) : (
          <ChartContainer className="max-h-[450px] w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                style={{ stroke: "#c2c9cf", strokeWidth: 1 }}
              />

              <YAxis tickLine={false} axisLine={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="quantity"
                type="linear"
                fill="#CCECFF"
                fillOpacity={0.4}
                stroke="#42B8FF"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
