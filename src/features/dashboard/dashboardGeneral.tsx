import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn, formatValue } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@features/ui/popover";
import { Button } from "@features/ui/button";
import {
  Calendar as CalendarIcon,
  MoveDownRight,
  MoveUpRight,
} from "lucide-react";
import { Calendar } from "@features/ui/calendar";
import { getGeneralOverview } from "@features/shared/actions/dashboard.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@features/ui/card";
import { Progress } from "@features/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@features/ui/tabs";
import {
  ChangeType,
  GeneralResponse,
  StockLevel,
} from "@features/shared/types/dashboard.types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@features/ui/chart";
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";

const stockLevelCategories = [
  {
    label: "High stock",
    value: "HIGH_STOCK",
    bgColor: "bg-[#0DCACA]",
  },
  {
    label: "Low stock",
    value: "LOW_STOCK",
    bgColor: "bg-[#E36D6A]",
  },
  {
    label: "Out of stock",
    value: "OUT_OF_STOCK",
    bgColor: "bg-[#E2E8F0]",
  },
];

const chartCardsData = [
  {
    title: "TOTAL PRODUCT SOLD",
    key: "totalItemsSold",
    chartLabel: "Product Sold",
  },
  {
    title: "TOTAL TRANSACTIONS",
    key: "totalTransactions",
    chartLabel: "Transactions",
  },
  {
    title: "INVENTORY TURNOVER RATE",
    key: "inventoryTurnoverRate",
    chartLabel: "Turnover Rate",
  },
  {
    title: "TOTAL REVENUE",
    key: "totalRevenue",
    chartLabel: "Revenue",
  },
  {
    title: "AVERAGE ITEMS PER TRANSACTION",
    key: "averageItemsPerTransaction",
    chartLabel: "Average Items",
  },
  {
    title: "CUSTOMERS",
    key: "customers",
    chartLabel: "Customers",
  },
  {
    title: "ITEMS RETURNED",
    key: "itemsReturned",
    chartLabel: "Returned Items",
  },
];

const DashboardGeneral = () => {
  const today = new Date();
  const threeMonthsAgo = today;
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  const [data, setData] = useState<GeneralResponse>();
  const [date, setDate] = useState<Required<DateRange>>({
    from: threeMonthsAgo,
    to: today,
  });
  useEffect(() => {
    const fetchGeneralOverview = async () => {
      const generalResponse = await getGeneralOverview({
        endDate: date.to.toISOString(),
        startDate: date.from?.toISOString(),
      });
      if (generalResponse) {
        setData(generalResponse);
      }
    };
    void fetchGeneralOverview();
  }, [date]);

  const lowStockItems = useMemo(
    () =>
      data?.itemStockLevel.items.filter(
        ({ stockLevel }) => stockLevel === "LOW_STOCK",
      ) ?? [],
    [data],
  );

  const outOfStockItems = useMemo(
    () =>
      data?.itemStockLevel.items.filter(
        ({ stockLevel }) => stockLevel === "OUT_OF_STOCK",
      ) ?? [],
    [data],
  );

  const stockLevelPercentage = useCallback(
    (level: StockLevel) => {
      const stocks = data?.itemStockLevel.items ?? [];
      const totalStock = stocks.length;
      const levelTotalStock = stocks.filter(
        ({ stockLevel }) => stockLevel === level,
      ).length;
      return (levelTotalStock / totalStock) * 100;
    },
    [data],
  );

  const getChartColor = (changeType: ChangeType) => {
    const colorMap: Record<ChangeType, string> = {
      INCREASE: "#A1FFDD",
      DECREASE: "#FFA1A1",
      NONE: "#475569",
    };
    return colorMap[changeType];
  };

  return (
    <div>
      <DatePickerWithRange date={date} setDate={setDate} />
      <div className="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          className="row-span-2"
          title={"ITEMS STOCK LEVEL"}
          totalData={{
            total: data?.itemStockLevel.totalStock ?? 0,
            type: "number",
          }}
          change={{
            type: data?.itemStockLevel.changeType ?? "NONE",
            value: data?.itemStockLevel.percentageChange ?? 0,
          }}
        >
          <span className="font-medium text-gray-500">Total Stock</span>
          <div className="mt-6">
            <div className="flex w-full">
              {stockLevelCategories.map(({ bgColor, label, value }) => (
                <Progress
                  key={label}
                  value={stockLevelPercentage(value as StockLevel)}
                  filler={true}
                  className={cn(bgColor)}
                  style={{
                    width: `${stockLevelPercentage(value as StockLevel)}%`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              {stockLevelCategories.map(({ bgColor, label }) => (
                <div key={label} className="flex items-center gap-x-0.5">
                  <div className={cn("h-3 w-3 rounded-lg", bgColor)}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="text-info-blue bg-info-blue-light mt-4 w-fit rounded-2xl px-3 py-2 text-sm">
              Stock DOH: 15 days
            </div>
            <div className="mt-6">
              <Tabs defaultValue="account">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="LOW_STOCK">Low stock</TabsTrigger>
                  <TabsTrigger value="OUT_OF_STOCK">Out of stock</TabsTrigger>
                </TabsList>
                <TabsContent value="LOW_STOCK">
                  <div className="space-y-3">
                    {lowStockItems.map(({ quantity, itemName }) => (
                      <div
                        key={`${itemName}-${quantity}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-x-0.5">
                          <span className="h-3.5 w-1.5 rounded-md bg-[#E36D6A]"></span>
                          <span className="text-gray-600">{itemName}</span>
                        </div>
                        <span className="font-medium text-[#111111]">
                          {quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="OUT_OF_STOCK">
                  <div className="space-y-3">
                    {outOfStockItems.map(({ quantity, itemName }) => (
                      <div
                        key={`${itemName}-${quantity}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-x-0.5">
                          <span className="h-3.5 w-1.5 rounded-md bg-[#E36D6A]"></span>
                          <span className="text-gray-600">{itemName}</span>
                        </div>
                        <span className="font-medium text-[#111111]">
                          {quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </BaseCard>
        {chartCardsData.map(({ title, key, chartLabel }) => (
          <BaseCard
            key={key}
            title={title}
            totalData={{
              total: data?.[key as keyof GeneralResponse].total ?? 0,
              type: "number",
            }}
            change={{
              type: data?.[key as keyof GeneralResponse].changeType ?? "NONE",
              value: data?.[key as keyof GeneralResponse].percentageChange ?? 0,
            }}
            className="pb-0"
          >
            <div className="mt-5">
              <Chart
                label={chartLabel}
                color={getChartColor(
                  data?.[key as keyof GeneralResponse].changeType ?? "NONE",
                )}
              />
            </div>
          </BaseCard>
        ))}
        <BaseCard
          title={"EXPIRING SOON ITEMS"}
          totalData={{
            total: data?.soonToExpireItems.total ?? 0,
            type: "number",
          }}
          change={{
            type: data?.soonToExpireItems.changeType ?? "NONE",
            value: data?.soonToExpireItems.percentageChange ?? 0,
          }}
          className="pb-0"
        >
          <div className="mt-5">List here</div>
        </BaseCard>
      </div>
    </div>
  );
};

export default DashboardGeneral;

type DatePickerWithRangeProps = {
  date: DateRange;
  setDate: Dispatch<SetStateAction<Required<DateRange>>>;
};
export function DatePickerWithRange({
  setDate,
  date,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start bg-gray-200 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dateRange) => {
              const endDate = dateRange?.to;
              if (dateRange && endDate) {
                setDate({
                  ...dateRange,
                  to: endDate,
                });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

type BaseCardProps = {
  title: string;
  children: ReactNode;
  totalData: {
    total: number;
    type: "money" | "number" | "percentage";
  };
  change?: {
    type: ChangeType;
    value: number;
  };
  className?: string;
};

export const BaseCard = ({
  children,
  title,
  totalData,
  change,
  className,
}: BaseCardProps) => {
  return (
    <Card className={cn("w-full gap-0", className)}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="flex gap-1">
          <span className="text-4xl font-bold">
            {formatValue(totalData.total, totalData.type)}
          </span>
          {change && (
            <div
              className={cn(
                "flex items-center gap-x-1 self-center rounded-4xl px-[6px] py-[3px] text-sm",
                change.type === "INCREASE" && "bg-success-50 text-success-700",
                change.type === "DECREASE" && "bg-error-50 text-error-600",
              )}
            >
              {change.type === "INCREASE" && (
                <MoveUpRight
                  size="15"
                  className="bg-success-700 rounded-full p-1 text-white"
                />
              )}
              {change.type === "DECREASE" && (
                <MoveDownRight
                  size="15"
                  className="bg-error-600 rounded-full p-1 text-white"
                />
              )}
              <span>{formatValue(change.value, "percentage")}</span>
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

//MOCK DATA
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

type ChartProps = {
  label: string;
  color: string;
};
export function Chart({ color, label }: ChartProps) {
  return (
    <ChartContainer
      config={{
        desktop: {
          label,
          color,
        },
      }}
      className="h-[100px] w-full"
    >
      <ResponsiveContainer width="100%" height={100}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 161, 161, 0.8)" />
              <stop offset="60%" stopColor="rgba(163, 22, 22, 0.8)" />
              <stop offset="100%" stopColor="rgba(253, 237, 237, 0.8)" />
            </linearGradient>
          </defs>

          <CartesianGrid height={30} vertical={false} strokeDasharray="3 3" />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            color={"green"}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
