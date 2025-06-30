"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/features/ui/chart";
import React, { useEffect, useState } from "react";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import { getSellingCategories } from "@features/shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { Skeleton } from "../ui/skeleton";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { generateColor } from "@/lib/utils";

interface ChartData {
  name: string;
  quantity: number;
}

export default function DashboardSellingCategories() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    name: {
      label: "Name",
    },
  });

  useEffect(() => {
    const fetchSellingCategories = async () => {
      setIsLoading(true);
      const sellingCategoriesResponse = await getSellingCategories({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      });
      console.log("sellingCategoriesResponse", sellingCategoriesResponse);
      if (sellingCategoriesResponse) {
        const { categories, quantities } = sellingCategoriesResponse.topSelling;
        const convertedChartData = categories.map((name, index) => {
          setChartConfig((prev) => ({
            ...prev,
            [name]: {
              label: name,
              color: generateColor(index + 1, true, true),
            },
          }));
          return {
            name,
            quantity: quantities[index],
            fill: generateColor(index + 1, true, true),
          };
        });

        setChartData(convertedChartData);
      }
      setIsLoading(false);
    };
    void fetchSellingCategories();
  }, [selectedDateRange]);

  return (
    <DashboardBaseCard
      title="Top selling Categories"
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
            <Pie
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              data={chartData}
              nameKey="name"
              dataKey="quantity"
            />
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
