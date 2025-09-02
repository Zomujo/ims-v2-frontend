"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ComboboxProps = {
  items: {
    value: string;
    label: string | ReactNode;
    searchBy?: string;
  }[];
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  moduleName?: string;
  onChange?: (value: string) => void;
  onSelected?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};

export function Combobox({
  items,
  placeholder,
  disabled,
  value,
  className,
  moduleName,
  children,
  onSelected,
  onOpenChange,
}: Readonly<PropsWithChildren<ComboboxProps>>) {
  const [open, setOpen] = useState(false);

  // Find the selected option's label for display
  const selectedOption = items.find((option) => option.value === value);
  const selectPlaceholder = placeholder ?? "Select item...";

  return (
    <div className={cn("w-full", className)}>
      <Popover
        modal
        open={open}
        onOpenChange={(openValue) => {
          onOpenChange?.(openValue);
          setOpen(openValue);
        }}
      >
        <PopoverTrigger disabled={disabled} asChild>
          <Button
            variant="outline"
            aria-expanded={open}
            className="h-11 w-full justify-between"
            aria-roledescription="Combobox"
          >
            {selectedOption?.label ?? selectPlaceholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={selectPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>No {moduleName ?? "item"} found.</CommandEmpty>
              <CommandGroup>
                {items.map(({ searchBy, value: itemValue, label }) => (
                  <CommandItem
                    key={itemValue}
                    value={
                      typeof label === "string"
                        ? label
                        : (searchBy ?? itemValue)
                    }
                    onSelect={(currentValue) => {
                      const newValue =
                        currentValue === value ? "" : currentValue;
                      setOpen(false);
                      onSelected?.(newValue);
                    }}
                  >
                    {label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === itemValue ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
                {Boolean(children) && (
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      onSelected?.("");
                    }}
                  >
                    {children}
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
