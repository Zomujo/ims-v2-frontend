import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@features/ui/dropdown-menu";
import { Button } from "@features/ui/button";
import { Badge } from "@features/ui/badge";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";

enum DATE_RANGE {
  ALL = "",
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  LAST_THREE_MONTHS = "last_three_months",
  THIS_YEAR = "this_year",
}

type DateRange = DATE_RANGE | "";

const DATE_RANGE_OPTIONS = [
  { label: "All", value: DATE_RANGE.ALL },
  { label: "Today", value: DATE_RANGE.TODAY },
  { label: "This Week", value: DATE_RANGE.THIS_WEEK },
  { label: "This Month", value: DATE_RANGE.THIS_MONTH },
  { label: "Last Month", value: DATE_RANGE.LAST_MONTH },
  { label: "Last Three Months", value: DATE_RANGE.LAST_THREE_MONTHS },
  { label: "This Year", value: DATE_RANGE.THIS_YEAR },
];

export function ItemsBatchesFilters() {
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRange>("");
  const { setSearchParams, getSearchParams } = useImsSearchParams();

  const handleDateRangeChange = (value: string) => {
    setDateRangeFilter(value as DateRange);
    setSearchParams({ key: "dateRange", value });
  };
  useEffect(() => {
    setDateRangeFilter(getSearchParams("dateRange") as DateRange);
  }, []);
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Date Range
            {dateRangeFilter !== "" && (
              <Badge variant="secondary" className="ml-2">
                {
                  DATE_RANGE_OPTIONS.find(
                    ({ value }) => value === dateRangeFilter,
                  )?.label
                }
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup
            value={dateRangeFilter}
            onValueChange={handleDateRangeChange}
          >
            {DATE_RANGE_OPTIONS.map(({ value, label }) => (
              <DropdownMenuRadioItem
                key={value}
                value={value}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
