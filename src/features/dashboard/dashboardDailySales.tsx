import React, { useEffect, useState } from "react";
import DashboardBaseCard from "./dashboardBaseCard";
import { DATE_RANGE } from "../layout/search-with-filter/search-with-filter.data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getDailySales } from "../shared/actions/dashboard.actions";
import { DateRangeQueryOptions } from "../shared/types/utitls.types";
import { DailySalesResponse } from "../shared/types/dashboard.types";
import { Skeleton } from "../ui/skeleton";

const DashboardDailySales = () => {
  const [chartData, setChartData] = useState<{ date: string; sales: number }[]>(
    [],
  );
  const dailySalesConfig = {
    visitors: {
      label: "Visitors",
    },
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const [isSalesLoading, setSalesLoading] = useState(false);
  const [selectDailySales, setSelectedDailySales] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );

  useEffect(() => {
    async function fetchDailySales() {
      setSalesLoading(true);
      chartData.length = 0;

      const { sales } = (await getDailySales({
        dateRange: selectDailySales as DateRangeQueryOptions,
      })) as DailySalesResponse;
      const { dates, quantities } = sales[0];

      const formattedData = dates.map((date, index) => ({
        date: date.split("T")[0],
        sales: quantities[index] ?? 0,
      }));

      setChartData(formattedData);
      setSalesLoading(false);
    }
    void fetchDailySales();
  }, [selectDailySales]);
  return (
    <div>
      <DashboardBaseCard
        title="Daily Sales"
        selectedValue={selectDailySales}
        setSelectedValue={setSelectedDailySales}
      >
        <ChartContainer
          config={dailySalesConfig}
          className="aspect-auto h-[400px] w-full"
        >
          {!isSalesLoading ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DBF73" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1DBF73" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="sales"
                type="natural"
                fill="url(#fillMobile)"
                stroke="#1DBF73"
                stackId="a"
              />
            </AreaChart>
          ) : (
            <Skeleton className="h-96 w-[70vw]" />
          )}
        </ChartContainer>
      </DashboardBaseCard>
    </div>
  );
};

export default DashboardDailySales;
