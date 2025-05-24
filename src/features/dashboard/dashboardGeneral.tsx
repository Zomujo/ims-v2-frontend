"use client";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@features/ui/popover";
import { Button } from "@features/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@features/ui/calendar";
import { getGeneralOverview } from "@features/shared/actions/dashboard.actions";

const DashboardGeneral = () => {
  const today = new Date();
  const threeMonthsAgo = today;
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  const [date, setDate] = useState<DateRange>({
    from: threeMonthsAgo,
    to: today,
  });
  useEffect(() => {
    const fetchGeneralOverview = async () => {
      const data = await getGeneralOverview({
        endDate: date.to.toISOString(),
        startDate: date.from.toISOString(),
      });
      if (data) {
        console.log("General Overview Data:", data);
      }
    };
    void fetchGeneralOverview();
  }, []);

  return (
    <div>
      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  );
};

export default DashboardGeneral;

type DatePickerWithRangeProps = {
  date: DateRange;
  setDate: (date: DateRange | undefined) => void;
};
export function DatePickerWithRange({
  setDate,
  date,
}: DatePickerWithRangeProps) {
  // useEffect(() => {
  //   if (!date) {
  //     const from = getSearchParams("startDate");
  //     const to = getSearchParams("endDate");
  //     if (from && to) {
  //       setDate({
  //         from: new Date(from),
  //         to: new Date(to),
  //       });
  //     } else {
  //       const today = new Date();
  //       const threeMonthsAgo = today;
  //       threeMonthsAgo.setMonth(today.getMonth() - 3);
  //       setDate({
  //         from: threeMonthsAgo,
  //         to: today,
  //       });
  //     }
  //   }
  //   setSearchParams({
  //     value: date?.from?.toISOString() ?? "",
  //     key: "startDate",
  //   });
  //   setSearchParams({
  //     value: date?.to?.toISOString() ?? "",
  //     key: "endDate",
  //   });
  // }, []);

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
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
