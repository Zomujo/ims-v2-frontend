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
};

export function ImsSelect({
  options,
  className,
  moduleName,
  defaultValue,
  disabled,
  onChange,
  showNone = true,
  ...props
}: Readonly<ImsSelectProps>) {
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
        <SelectGroup>
          {showNone && <SelectItem value="none">None</SelectItem>}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
