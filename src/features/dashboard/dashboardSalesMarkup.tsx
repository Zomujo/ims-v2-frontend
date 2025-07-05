import { useEffect, useState } from "react";
import { DATE_RANGE } from "@features/layout/search-with-filter/search-with-filter.data";
import DashboardBaseCard from "@features/dashboard/dashboardBaseCard";
import { getSaleInsuranceMarkup } from "@features/shared/actions/dashboard.actions";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@features/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { DateRangeQueryOptions } from "@features/shared/types/utitls.types";
import { formatValue } from "@/lib/utils";
import { Skeleton } from "@features/ui/skeleton";

interface ChartData {
  name: string;
  quantity: number;
  total: number;
}
export default function DashboardSalesMarkup() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDateRange, setSelectedDateRange] = useState<DATE_RANGE>(
    DATE_RANGE.THIS_MONTH,
  );

  useEffect(() => {
    const fetchSalesMarkup = async () => {
      setIsLoading(true);
      const response = await getSaleInsuranceMarkup({
        dateRange: selectedDateRange as DateRangeQueryOptions,
      });

      if (!response) {
        setIsLoading(false);
        return;
      }
      const { insured, notInsured } = response;

      if (insured && notInsured) {
        setChartData([
          {
            name: "Insured Sales",
            quantity: insured.quantity,
            total: insured.total,
          },
          {
            name: "Not Insured Sales",
            quantity: notInsured.quantity,
            total: notInsured.total,
          },
        ]);
      }
      setIsLoading(false);
    };
    void fetchSalesMarkup();
  }, [selectedDateRange]);

  return (
    <DashboardBaseCard
      title="Insurance Sales Comparison"
      noResults={!chartData.length}
      isLoading={isLoading}
      selectedValue={selectedDateRange}
      setSelectedValue={setSelectedDateRange}
    >
      {isLoading ? (
        <div className="flex h-[300px] w-full items-end justify-center gap-8 px-8">
          <div className="flex h-full w-1/3 items-end gap-2">
            <Skeleton className="h-3/4 w-full" />
            <Skeleton className="h-full w-full" />
          </div>
          <div className="flex h-full w-1/3 items-end gap-2">
            <Skeleton className="h-1/2 w-full" />
            <Skeleton className="h-3/4 w-full" />
          </div>
        </div>
      ) : (
        <ChartContainer
          config={{
            insured: {
              label: "Insured Sales",
              color: "#FF6E66",
            },
            notInsured: {
              label: "Not Insured Sales",
              color: "#42B8FF",
            },
          }}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
              formatter={(value, name) =>
                name === "total"
                  ? ["Total: ", formatValue(value as number, "money")]
                  : ["Quantity: ", value]
              }
            />
            <Bar dataKey="quantity" fill="#FF6E66" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="total" fill="#42B8FF" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => formatValue(value, "money")}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
    </DashboardBaseCard>
  );
}
