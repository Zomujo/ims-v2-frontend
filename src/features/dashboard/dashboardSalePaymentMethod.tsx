"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/features/ui/chart";
import React, { useMemo, useState } from "react";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { getSalePaymentMethod } from "@features/shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { Skeleton } from "../ui/skeleton";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { cn, generateColor } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { TopSelling } from "@features/shared/types/dashboard.types";
import { CacheKey } from "@/lib/cache/cache-data";

interface ChartData {
  category: string;
  quantity: number;
  fill: string;
}

export default function DashboardSalePaymentMethod() {
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );
  const isMobile = useIsMobile("x-large-mobile");

  const { data: salePaymentMethodsResponse, loading: isLoading } = useFetchData<
    TopSelling | undefined
  >({
    fetchFn: () =>
      getSalePaymentMethod({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      }),
    cacheKey: CacheKey.DashboardSalePaymentMethod,
    deps: [selectedDateRange],
  });

  const chartData = useMemo<ChartData[]>(() => {
    const categories = salePaymentMethodsResponse?.categories;
    const quantities = salePaymentMethodsResponse?.quantities;
    if (categories && quantities) {
      return categories.map((category, index) => ({
        category,
        quantity: quantities[index],
        fill: generateColor(index + 1, true, true),
      }));
    }
    return [];
  }, [salePaymentMethodsResponse]);

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      name: {
        label: "Category",
      },
    };
    chartData.forEach((data, index) => {
      config[data.category] = {
        label: data.category,
        color: generateColor(index + 1, true, true),
      };
    });
    return config;
  }, [chartData]);

  const totalQuantity = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.quantity, 0),
    [chartData],
  );

  return (
    <DashboardBaseCard
      title="Sale Payment Method"
      noResults={!chartData.length}
      isLoading={isLoading}
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="category"
              innerRadius={100}
              strokeWidth={5}
              paddingAngle={8}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuantity.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
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
