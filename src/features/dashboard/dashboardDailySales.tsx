"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DashboardBaseCard from "./dashboardBaseCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { getDailySales } from "../shared/actions/dashboard.actions";
import { DailySalesResponse } from "../shared/types/dashboard.types";
import { Skeleton } from "../ui/skeleton";
import { DatePicker } from "@features/ui/date-picker";
import { format } from "date-fns";

export const DashboardDailySales = () => {
  const [chartData, setChartData] = useState<
    { hour: string; startDate: number; endDate: number }[]
  >([]);

  const [isSalesLoading, setSalesLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchDailySales() {
      setSalesLoading(true);
      chartData.length = 0;
      const start = startDate.toISOString();
      const end = endDate.toISOString();
      const { sales } = (await getDailySales({
        startDate: start,
        endDate: end,
      })) as DailySalesResponse;

      const salesChartData = (sales.hours ?? []).map((hour, index) => ({
        hour,
        startDate: sales[start.split("T")[0]][index],
        endDate: sales[end.split("T")[0]][index],
      }));
      setChartData(salesChartData);
      setSalesLoading(false);
    }
    void fetchDailySales();
  }, [startDate, endDate]);
  return (
    <div>
      <DashboardBaseCard
        noResults={!chartData.length}
        isLoading={isSalesLoading}
        title="Daily Sales"
        customFilter={
          <div className="flex gap-4">
            <DatePicker
              date={startDate}
              setDate={
                setStartDate as Dispatch<SetStateAction<Date | undefined>>
              }
            />
            <DatePicker
              date={endDate}
              setDate={setEndDate as Dispatch<SetStateAction<Date | undefined>>}
            />
          </div>
        }
      >
        <ChartContainer
          config={{
            startDate: {
              label: format(startDate, "LLL dd, y"),
              color: "#FF6E66",
            },
            endDate: {
              label: format(endDate, "LLL dd, y"),
              color: "#42B8FF",
            },
          }}
          className="aspect-auto h-[400px] w-full"
        >
          {!isSalesLoading ? (
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="startDate"
                type="monotone"
                stroke="#FF6E66"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="endDate"
                type="monotone"
                stroke="#42B8FF"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <Skeleton className="h-96" />
          )}
        </ChartContainer>
      </DashboardBaseCard>
    </div>
  );
};

export default DashboardDailySales;
