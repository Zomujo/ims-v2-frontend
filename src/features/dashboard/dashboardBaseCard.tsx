import { CardHeader, CardTitle, Card, CardContent } from "@features/ui/card";
import {
  DATE_RANGE,
  dateRangeOptions,
} from "@features/layout/search-with-filter/search-with-filter.data";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { ImsSelect } from "@features/shared/components/ims-select";

interface DropdownOptions {
  label: string;
  value: DATE_RANGE;
}

type DashboardBaseCardProps = {
  title: string;
  dropdownOptions?: DropdownOptions[];
  selectedValue: DATE_RANGE;
  setSelectedValue: Dispatch<SetStateAction<DATE_RANGE>>;
  children: ReactNode;
};
export default function DashboardBaseCard({
  title,
  dropdownOptions = dateRangeOptions.slice(1),
  selectedValue,
  setSelectedValue,
  children,
}: DashboardBaseCardProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="text-2xl font-bold">{title}</span>
          <div className="max-w-3xs">
            <ImsSelect
              showNone={false}
              options={dropdownOptions}
              value={selectedValue}
              onChange={(value) => setSelectedValue(value as DATE_RANGE)}
              moduleName="Date Range"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
