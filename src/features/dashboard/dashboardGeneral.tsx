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
import { Skeleton } from "@features/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@features/ui/tooltip";
import styles from "./dashboard.module.css";
import { getItems } from "@features/shared/actions/items.actions";
import { ItemsDto } from "@features/shared/types/action.types";

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

const cardsData = [
  {
    title: "TOTAL PRODUCT SOLD",
    key: "totalItemsSold",
  },
  {
    title: "TOTAL TRANSACTIONS",
    key: "totalTransactions",
  },
  {
    title: "INVENTORY TURNOVER RATE",
    key: "inventoryTurnoverRate",
  },
  {
    title: "TOTAL REVENUE",
    key: "totalRevenue",
  },
  {
    title: "AVERAGE ITEMS PER TRANSACTION",
    key: "averageItemsPerTransaction",
  },
  {
    title: "CUSTOMERS",
    key: "customers",
  },
  {
    title: "ITEMS RETURNED",
    key: "itemsReturned",
  },
];

const DashboardGeneral = () => {
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const [data, setData] = useState<GeneralResponse>();
  const [date, setDate] = useState<Required<DateRange>>({
    from: threeMonthsAgo,
    to: today,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentStockLevelView, setCurrentStockLevelView] =
    useState<Exclude<StockLevel, "STOCKED">>("LOW");
  const [isLoadingStock, setIsLoadingStock] = useState(true);
  const [stockItems, setStockItems] = useState<ItemsDto[]>([]);

  useEffect(() => {
    const fetchGeneralOverview = async () => {
      setIsLoading(true);
      const generalResponse = await getGeneralOverview({
        endDate: date.to.toISOString(),
        startDate: date.from?.toISOString(),
      });
      if (generalResponse) {
        setData(generalResponse);
      }
      setIsLoading(false);
    };
    void fetchGeneralOverview();
  }, [date]);

  const fetchStockItems = async () => {
    setIsLoadingStock(true);
    const stockResponse = await getItems({
      status: currentStockLevelView,
      pageSize: "5",
    });
    if (stockResponse) {
      setStockItems(stockResponse.rows);
    }
    setIsLoadingStock(false);
  };

  useEffect(() => {
    void fetchStockItems();
  }, [currentStockLevelView]);

  const stockLevelPercentage = useCallback(
    (level: StockLevel) => {
      const stocks = data?.itemStockLevel.stock;
      const totalStock = stocks?.total;

      if (!totalStock) return 0;

      const levelStockMap: Record<StockLevel, number> = {
        OUT_OF_STOCK: stocks?.outOfStock ?? 0,
        LOW: stocks?.lowStocked ?? 0,
        STOCKED: stocks?.highStocked ?? 0,
      };
      return (levelStockMap[level] / totalStock) * 100;
    },
    [data],
  );

  const stockColor = useMemo(() => {
    const category = stockLevelCategories.find((cat) =>
      cat.value.includes(currentStockLevelView),
    );
    return category?.bgColor ?? "bg-gray-400";
  }, [currentStockLevelView]);

  const stockLevelItems = isLoadingStock ? (
    <StockItemsSkeleton />
  ) : stockItems.length > 0 ? (
    <div className="space-y-3">
      {stockItems.map(({ totalStock, name }) => (
        <div
          key={`${name}-${totalStock}`}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-x-2">
            <span className={cn("h-3.5 w-1.5 rounded-md", stockColor)}></span>
            <span className="text-gray-600">{name}</span>
          </div>
          <span className="font-medium text-[#111111]">{totalStock}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex h-24 items-center justify-center">
      <p className="text-sm text-gray-500">No items to display.</p>
    </div>
  );

  return (
    <div>
      <DatePickerWithRange date={date} setDate={setDate} />
      <div className="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          className="row-span-2"
          title={"ITEMS STOCK LEVEL"}
          totalData={{
            total: data?.itemStockLevel.stock.totalStock ?? 0,
            type: "number",
          }}
          change={{
            type: data?.itemStockLevel.changeType ?? "NONE",
            value: data?.itemStockLevel.percentageChange ?? 0,
          }}
          isLoading={isLoading}
        >
          <div>
            {isLoading ? (
              <StockLevelCardSkeleton />
            ) : (
              <>
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
                  <div className="mt-4 flex w-full justify-between gap-2">
                    {stockLevelCategories.map(({ bgColor, label }) => (
                      <Tooltip key={label}>
                        <TooltipTrigger asChild>
                          <div className="flex min-w-0 items-center gap-x-0.5">
                            <div
                              className={cn("h-3 w-3 rounded-lg", bgColor)}
                            ></div>
                            <span className="w-[6rem] truncate text-sm lg:text-base">
                              {label}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  <div className="text-info-blue bg-info-blue-light mt-4 w-fit rounded-2xl px-3 py-2 text-sm">
                    Stock DOH:{" "}
                    {Math.floor(
                      data?.itemStockLevel.stock.stockDaysOnHand ?? 0,
                    )}{" "}
                    days
                  </div>
                </div>
              </>
            )}
            <div className="mt-6">
              <Tabs defaultValue="LOW_STOCK">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger
                    onClick={() => setCurrentStockLevelView("LOW")}
                    value="LOW_STOCK"
                  >
                    Low stock
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setCurrentStockLevelView("OUT_OF_STOCK")}
                    value="OUT_OF_STOCK"
                  >
                    Out of stock
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  onClick={() => setCurrentStockLevelView("OUT_OF_STOCK")}
                  value="LOW_STOCK"
                >
                  {stockLevelItems}
                </TabsContent>
                <TabsContent value="OUT_OF_STOCK">
                  {stockLevelItems}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </BaseCard>
        {cardsData.map(({ title, key }) => (
          <BaseCard
            showChart={true}
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
            isLoading={isLoading}
          ></BaseCard>
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
          {isLoading ? (
            <div className="mt-5 space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            <div className="mt-5">List here</div>
          )}
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
            autoFocus
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
  children?: ReactNode;
  totalData: {
    total: number;
    type: "money" | "number" | "percentage";
  };
  change?: {
    type: ChangeType;
    value: number;
  };
  className?: string;
  isLoading?: boolean;
  showChart?: boolean;
};

export const BaseCard = ({
  children,
  title,
  totalData,
  change,
  className,
  isLoading = false,
  showChart,
}: BaseCardProps) => {
  return (
    <Card className={cn("w-full gap-0", className)}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-1">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-[150px]" />
            {/*<Skeleton className="h-[100px] w-full" />*/}
          </div>
        ) : (
          <div className="flex gap-1">
            <span className="text-4xl font-bold">
              {formatValue(totalData.total, totalData.type)}
            </span>
            {change && (
              <div
                className={cn(
                  "flex items-center gap-x-1 self-center rounded-4xl px-[6px] py-[3px] text-sm",
                  change.type === "INCREMENT" &&
                    "bg-success-50 text-success-700",
                  change.type === "DECREMENT" && "bg-error-50 text-error-600",
                )}
              >
                {change.type === "INCREMENT" && (
                  <MoveUpRight
                    size="15"
                    className="bg-success-700 rounded-full p-1 text-white"
                  />
                )}
                {change.type === "DECREMENT" && (
                  <MoveDownRight
                    size="15"
                    className="bg-error-600 rounded-full p-1 text-white"
                  />
                )}
                <span>{formatValue(change.value, "percentage")}</span>
              </div>
            )}
          </div>
        )}
        {children}
        {showChart &&
          (isLoading ? (
            <ChartSkeleton />
          ) : (
            <div
              className={cn(
                change?.type === "INCREMENT"
                  ? styles.incrementGraph
                  : styles.decrementGraph,
                "mt-12 h-[100px] w-full bg-contain bg-center bg-no-repeat",
              )}
            >
              <div className="flex flex-col gap-8">
                <div className="border-t border-dotted border-gray-200" />
                <div className="border-t border-dotted border-gray-200" />
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

const StockLevelCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-[150px]" />
    <Skeleton className="h-4 w-[100px]" />
    <Skeleton className="h-6 w-full" />
    <div className="mt-4 flex justify-between">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-8 w-32" />
  </div>
);

const ChartSkeleton = () => (
  <div className="mt-12">
    <Skeleton className="h-[100px] w-full" />
  </div>
);

const StockItemsSkeleton = () => (
  <div className="space-y-3 pt-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-3.5 w-1.5 rounded-md" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-8" />
      </div>
    ))}
  </div>
);
