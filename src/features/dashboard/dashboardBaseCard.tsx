import { CardHeader, CardTitle, Card, CardContent } from "@features/ui/card";
import {
  DATE_RANGE,
  dateRangeOptions,
} from "@features/layout/search-with-filter/search-with-filter.data";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { ImsSelect } from "@features/shared/components/ims-select";
import { cn } from "@/lib/utils";

interface DropdownOptions {
  label: string;
  value: DATE_RANGE;
}

type DashboardBaseCardProps = {
  title: string;
  dropdownOptions?: DropdownOptions[];
  selectedValue?: DATE_RANGE;
  setSelectedValue?: Dispatch<SetStateAction<DATE_RANGE>>;
  customFilter?: ReactNode;
  children: ReactNode;
  noResults?: boolean;
  isLoading?: boolean;
  noResultsHeight?: string;
};
export default function DashboardBaseCard({
  title,
  dropdownOptions = dateRangeOptions.slice(1),
  selectedValue,
  setSelectedValue,
  customFilter,
  children,
  noResultsHeight = "450px",
  noResults = false,
  isLoading = false,
}: DashboardBaseCardProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="text-2xl font-bold">{title}</span>
          <div className={cn(!customFilter && "max-w-3xs")}>
            {customFilter ? (
              customFilter
            ) : (
              <ImsSelect
                showNone={false}
                options={dropdownOptions}
                value={selectedValue}
                onChange={(value) =>
                  setSelectedValue && setSelectedValue(value as DATE_RANGE)
                }
                moduleName="Date Range"
              />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      {noResults && !isLoading ? (
        <CardContent
          className="flex items-center justify-center"
          style={{ height: `${noResultsHeight}` }}
        >
          <span className="text-muted-foreground">No results found</span>
        </CardContent>
      ) : (
        <CardContent className="p-0">{children}</CardContent>
      )}
    </Card>
  );
}
