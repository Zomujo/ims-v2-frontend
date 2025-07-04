import { ArrowUpIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { getItemCounts } from "../shared/actions/items.actions";
import { cn } from "@/lib/utils";

const formatedNumber = (num: number) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
export default async function StockCard() {
  const itemCounts = await getItemCounts();
  // Stock values for the progress bar (percentages)
  const highStock = formatedNumber(itemCounts?.highStocked ?? 0); // Cyan
  const lowStock = formatedNumber(itemCounts?.lowStocked ?? 0); // Red
  const outOfStock = formatedNumber(itemCounts?.outOfStock ?? 0); // Gray
  const totalItems = formatedNumber(itemCounts?.totalItems?.count ?? 0); // Total items
  const totalStock = formatedNumber(itemCounts?.totalStock ?? 0); // Total stock
  const percentageDifference =
    itemCounts?.totalItems?.percentageDifference ?? 0; // Percentage difference
  const isPercentageDiffIncrease =
    itemCounts?.totalItems?.changeType === "INCREASE";
  return (
    <Card className="w-full border-0 p-0 shadow-sm [&+div]:h-[calc(100%-14rem)]">
      <CardContent className="flex px-0 md:px-6 [&>div_p]:mb-4">
        <div className="basis-1/3 border-r-2 border-gray-200 p-5">
          <p className="text-sm tracking-wide text-gray-400 uppercase">
            Total Items
          </p>
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1 border-none bg-transparent p-0",
                {
                  "text-emerald-500": isPercentageDiffIncrease,
                  "text-red-500": !isPercentageDiffIncrease,
                },
              )}
            >
              <ArrowUpIcon
                className={cn("h-4 w-4", {
                  "rotate-180": !isPercentageDiffIncrease,
                })}
              />
              <span className="text-sm font-medium">
                {percentageDifference}%
              </span>
            </Badge>
          </div>
        </div>
        <div className="basis-2/3 p-5 md:pl-15">
          <p className="text-sm tracking-wide text-gray-400 uppercase">
            Total In Stock
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{totalStock}</p>
          <div className="flex w-1/2 gap-x-1 [&_div]:h-2.5 [&_div]:rounded-full">
            <div style={{ width: `${highStock}%` }} className="bg-teal-500" />
            <div style={{ width: `${lowStock}%` }} className="bg-red-500" />
            <div style={{ width: `${outOfStock}%` }} className="bg-gray-400" />
          </div>

          <div className="mt-3 flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-teal-500"></span>
              <span className="text-gray-600">High stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="text-gray-600">Low stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gray-400"></span>
              <span className="text-gray-600">Out of stock</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
