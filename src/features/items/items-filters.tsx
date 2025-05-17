import { useCategories } from "@/hooks/useCategories";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
import React, { useEffect, useState } from "react";
import { ITEMS_STATUS } from "@features/shared/types/action.types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@features/ui/dropdown-menu";
import { Button } from "@features/ui/button";
import { Badge } from "@features/ui/badge";
import { ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Stocked", value: ITEMS_STATUS.STOCKED },
  { label: "Low Stock", value: ITEMS_STATUS.LOW },
  { label: "Out of Stock", value: ITEMS_STATUS.OUT_OF_STOCK },
];

export function ItemsFilters() {
  const { categories } = useCategories();
  const {
    setSearchParams,
    setArraySearchParams,
    getSearchParams,
    getArraySearchParams,
  } = useImsSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<ITEMS_STATUS | "">("");

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as ITEMS_STATUS | "");
    setSearchParams({ key: "status", value });
  };

  useEffect(() => {
    setStatusFilter(getSearchParams("status") as ITEMS_STATUS | "");
    setSelectedCategories(getArraySearchParams("categories") ?? []);
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelectedCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      newSelectedCategories.forEach((id) => {
        setSearchParams({
          key: "categories",
          value: id,
        });
      });
      setArraySearchParams({
        key: "categories",
        values: newSelectedCategories,
      });
      return newSelectedCategories;
    });
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Status
            {statusFilter !== "" && (
              <Badge variant="secondary" className="ml-2">
                {STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup
            value={statusFilter}
            onValueChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Categories
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedCategories.length}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {categories?.length === 0 ? (
            <DropdownMenuItem disabled>
              No categories available
            </DropdownMenuItem>
          ) : (
            <>
              {categories?.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                  className="cursor-pointer"
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedCategories.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCategories([]);
                    }}
                    className="text-muted-foreground cursor-pointer justify-center text-xs"
                  >
                    Clear selection
                  </DropdownMenuItem>
                </>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
