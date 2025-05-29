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
import React, { useEffect, useState } from "react";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { getSalePaymentMethod } from "@features/shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { Skeleton } from "../ui/skeleton";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { generateColor } from "@/lib/utils";

interface ChartData {
  category: string;
  quantity: number;
}

export default function DashboardSalePaymentMethod() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    name: {
      label: "Category",
    },
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);
      const salePaymentMethodsResponse = await getSalePaymentMethod({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      });
      if (salePaymentMethodsResponse) {
        const { categories, quantities } = salePaymentMethodsResponse;
        const convertedChartData = categories.map((category, index) => {
          setChartConfig((prev) => ({
            ...prev,
            [category]: {
              label: category,
              color: generateColor(index + 1, true, true),
            },
          }));
          return {
            category,
            quantity: quantities[index],
            fill: generateColor(index + 1, true, true),
          };
        });

        setChartData(convertedChartData);
      }
      setIsLoading(false);
    };
    void fetchPaymentMethods();
  }, [selectedDateRange]);

  return (
    <DashboardBaseCard
      title="Sale Payment Method"
      selectedValue={selectedDateRange}
      setSelectedValue={setSelectedDateRange}
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="flex h-[450px] w-full items-center justify-center gap-5">
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
          className="mx-auto max-h-[450px] w-full max-w-4xl"
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
                          100%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={<ChartLegendContent nameKey="name" />}
            />
          </PieChart>
        </ChartContainer>
      )}
    </DashboardBaseCard>
  );
}
