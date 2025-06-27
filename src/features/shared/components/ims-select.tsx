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

type ImsSelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  moduleName?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
  showNone?: boolean;
  showSearch?: boolean;
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

  return (
    <Select
      disabled={disabled}
      defaultValue={defaultValue}
      onValueChange={onChange}
      {...props}
    >
      <SelectTrigger className={cn("w-full outline-none", className)}>
        <SelectValue placeholder={`Select ${moduleName}...`} />
      </SelectTrigger>

      <SelectContent>
        {shouldShowSearch && (
          <div className="px-2 py-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:border-blue-500"
            />
          </div>
        )}
        <SelectGroup>
          {showNone && <SelectItem value="none">None</SelectItem>}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found.
            </div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
