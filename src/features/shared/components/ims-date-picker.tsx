"use client";
import { Button } from "@/features/ui/button";
import { Calendar } from "@/features/ui/calendar";
import { Popover, PopoverTrigger } from "@/features/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { getYear } from "date-fns";
import { CalendarIcon } from "lucide-react";

type ImsDatePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function ImsDatePicker({
  value,
  onChange,
  className,
  placeholder,
  disabled,
}: Readonly<ImsDatePickerProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          {value ? (
            value.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          ) : (
            <span>{placeholder ?? "Pick a date"}</span>
          )}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-gray-20 w-auto rounded-2xl border p-0"
        align="start"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown"
          fromMonth={new Date(getYear(new Date()) - 1, 0)}
          toMonth={new Date(getYear(new Date()) + 1, 11)}
          fromYear={getYear(new Date()) - 4}
          toYear={getYear(new Date()) + 1}
          selected={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
          }}
          className="w-full"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
