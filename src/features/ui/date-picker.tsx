"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@features/ui/popover";
import { Button } from "@features/ui/button";
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "@features/ui/calendar";
import { format } from "date-fns";
import { Label } from "@features/ui/label";

type DatePickerWithRangeProps = {
  date: DateRange;
  setDate: Dispatch<SetStateAction<Required<DateRange>>>;
};
export function DatePickerWithRange({
  setDate,
  date,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start bg-gray-200 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dateRange) => {
              const endDate = dateRange?.to;
              if (dateRange && endDate) {
                setDate({
                  ...dateRange,
                  to: endDate,
                });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

type DatePickerProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  label?: string;
  placeholder?: string;
};

export function DatePicker({
  setDate,
  date,
  label,
  placeholder,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date
              ? date.toLocaleDateString()
              : placeholder
                ? placeholder
                : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
