import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@features/ui/dropdown-menu";
import { Button } from "@features/ui/button";
import { Badge } from "@features/ui/badge";
import { ChevronDown } from "lucide-react";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";

interface FilterOption {
  label: string;
  value: string;
}

export interface Filter {
  key: string;
  label: string;
  type: "radio" | "checkbox";
  options: FilterOption[];
  defaultValue?: string | string[];
}

export type FiltersProps = {
  filters: Filter[];
  className?: string;
};

export const Filters: React.FC<FiltersProps> = ({
  filters,
  className = "",
}) => {
  const {
    setSearchParams,
    setArraySearchParams,
    getSearchParams,
    getArraySearchParams,
  } = useImsSearchParams();

  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | string[]>
  >({});

  useEffect(() => {
    const initialValues: Record<string, string | string[]> = {};

    filters.forEach((filter) => {
      if (filter.type === "radio") {
        initialValues[filter.key] =
          getSearchParams(filter.key) || (filter.defaultValue as string) || "";
      } else {
        initialValues[filter.key] =
          getArraySearchParams(filter.key) ||
          (filter.defaultValue as string[]) ||
          [];
      }
    });

    setSelectedValues(initialValues);
  }, [filters]);

  const handleRadioChange = (key: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
    setSearchParams({ key, value });
  };

  const handleCheckboxToggle = (key: string, value: string) => {
    setSelectedValues((prev) => {
      const currentValues = (prev[key] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      setArraySearchParams({
        key,
        values: newValues,
      });

      return { ...prev, [key]: newValues };
    });
  };

  const clearSelection = (key: string) => {
    if (filters.find((f) => f.key === key)?.type === "radio") {
      setSelectedValues((prev) => ({ ...prev, [key]: "" }));
      setSearchParams({ key, value: "" });
    } else {
      setSelectedValues((prev) => ({ ...prev, [key]: [] }));
      setArraySearchParams({ key, values: [] });
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {filters.map(({ key, label, type, options }) => (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {label}
              {type === "radio" && selectedValues[key] && (
                <Badge variant="secondary" className="ml-2">
                  {options.find(({ value }) => value === selectedValues[key])
                    ?.label || ""}
                </Badge>
              )}
              {type === "checkbox" &&
                (selectedValues[key] as string[])?.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {(selectedValues[key] as string[])?.length}
                  </Badge>
                )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {type === "radio" ? (
              <DropdownMenuRadioGroup
                value={selectedValues[key] as string}
                onValueChange={(value) => handleRadioChange(key, value)}
              >
                {options.map(({ value, label: radioLabel }) => (
                  <DropdownMenuRadioItem
                    key={value}
                    value={value}
                    className="cursor-pointer"
                  >
                    {radioLabel}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              <>
                {options.length === 0 ? (
                  <DropdownMenuItem disabled>
                    No options available
                  </DropdownMenuItem>
                ) : (
                  <>
                    {options.map(({ value, label: checkboxLabel }) => (
                      <DropdownMenuCheckboxItem
                        key={value}
                        checked={(selectedValues[key] as string[])?.includes(
                          value,
                        )}
                        onCheckedChange={() => handleCheckboxToggle(key, value)}
                        className="cursor-pointer"
                      >
                        {checkboxLabel}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {(selectedValues[key] as string[])?.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => clearSelection(key)}
                          className="text-muted-foreground cursor-pointer justify-center text-xs"
                        >
                          Clear selection
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
};

export default Filters;
