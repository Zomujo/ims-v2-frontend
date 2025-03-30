import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";

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
};

export function ImsSelect({
  options,
  className,
  moduleName,
  defaultValue,
  onChange,
  ...props
}: Readonly<ImsSelectProps>) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange} {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={`Select ${moduleName}...`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">None</SelectItem>
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
