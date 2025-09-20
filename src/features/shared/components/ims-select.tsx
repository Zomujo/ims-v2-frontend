import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { SelectOption } from "@features/shared/types/utitls.types";

type ImsSelectProps = {
  options: SelectOption[];
  moduleName?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  showNone?: boolean;
  noResultsText?: string;
  showSearch?: boolean;
  loading?: boolean;
  apiSearch?: boolean;
  apiSearchChange?: (search: string) => void;
  apiLoading?: boolean;
};

export function ImsSelect({
  options,
  className,
  moduleName,
  defaultValue,
  disabled,
  onChange,
  showNone = true,
  showSearch = false,
  noResultsText = "No results found.",
  loading,
  apiSearch = false,
  apiSearchChange = () => {},
  apiLoading = false,
  ...props
}: Readonly<ImsSelectProps>) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const shouldShowSearch = options.length > 9 || showSearch;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const debounce = useDebounceCallback(apiSearchChange, 800);
  return (
    <Select
      disabled={disabled || loading}
      defaultValue={defaultValue}
      onValueChange={onChange}
      {...props}
    >
      <SelectTrigger className={cn("w-full outline-none", className)}>
        <SelectValue
          placeholder={
            loading ? "Loading... Please wait" : `Select ${moduleName}...`
          }
        />
      </SelectTrigger>

      <SelectContent>
        {shouldShowSearch && (
          <div className="relative px-2 py-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                apiSearch && debounce?.(e.target.value);
              }}
              onKeyDown={handleInputKeyDown}
              className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:border-blue-500"
            />
            {apiLoading && (
              <Loader2 className="absolute top-1/2 right-2 mr-2 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
            )}
          </div>
        )}
        <SelectGroup>
          {showNone && <SelectItem value="none">None</SelectItem>}
          {!apiSearch &&
            (filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                {noResultsText}
              </div>
            ))}
          {apiSearch &&
            (options.length > 0 ? (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                {noResultsText}
              </div>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
