"use client";
import CrudPage from "@/features/shared/components/crud-page";
import usePageCRUD from "@/features/shared/hooks/use-page-crud";
import { ViewMode } from "@/features/shared/types/action.types";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { calendarOption, months } from "@/lib/constant";
import { generateWeekDays } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  addDays,
  addWeeks,
  format,
  getMonth,
  getYear,
  isSameMonth,
  setMonth,
  setYear,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";

type DateWithTableProps<T = unknown> = {
  tableHeader: ColumnDef<T>[];
  tableData: T[];
  count: number;
  summaryTitle: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  loading: boolean;
};
const DateWithTable = <T extends { id: string }>({
  tableHeader,
  tableData,
  count,
  summaryTitle,
  viewMode,
  setViewMode,
  selectedDate,
  setSelectedDate,
  loading,
}: DateWithTableProps<T>) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const { state, isEditMode, handleRemoveQueryparam } = usePageCRUD({
    data: tableData,
  });

  const years = useMemo(() => {
    const currentYear = getYear(new Date());
    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  }, []);

  // Generate week days dynamically based on current week
  const weekDays = useMemo(() => {
    return generateWeekDays(currentWeekStart, selectedDate);
  }, [currentWeekStart, selectedDate]);

  const handleMonthChange = (monthName: string) => {
    const monthIndex = months.indexOf(monthName);
    const newDate = setMonth(selectedDate, monthIndex);
    setSelectedDate(newDate);
    setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 1 }));
  };

  const handleYearChange = (year: number) => {
    const newDate = setYear(selectedDate, year);
    setSelectedDate(newDate);
    setCurrentWeekStart(startOfWeek(newDate, { weekStartsOn: 1 }));
  };

  const handlePreviousWeek = () => {
    const newWeekStart = subWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newWeekStart);
    setSelectedDate(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newWeekStart);
    setSelectedDate(newWeekStart);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-dashboard-bg min-h-screen p-8">
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-dashboard-card border-border rounded-2xl border p-6 shadow-sm">
              {/* View Mode Toggle */}
              <div className="mb-2 flex items-center gap-2">
                {calendarOption.map(({ label, mode }, index) => (
                  <Badge
                    variant={viewMode === mode ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setViewMode(mode)}
                    key={index}
                  >
                    {label}
                  </Badge>
                ))}
              </div>

              {/* Month Selector */}
              <div className="mb-8 flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    disabled={
                      viewMode === "this_week" ||
                      viewMode === "last_three_months"
                    }
                  >
                    <Button
                      variant="ghost"
                      className="text-dashboard-text-primary hover:bg-accent bg-accent flex h-auto items-center gap-2 p-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span className="text-lg font-medium">
                        {months[getMonth(selectedDate)]}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {months.map((month) => (
                      <DropdownMenuItem
                        key={month}
                        onClick={() => handleMonthChange(month)}
                        className="cursor-pointer"
                      >
                        {month}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* year */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-dashboard-text-primary hover:bg-accent flex h-auto items-center gap-2 p-2"
                    >
                      <span className="text-lg font-medium">
                        {getYear(selectedDate)}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    {years.map((year) => (
                      <DropdownMenuItem
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className="cursor-pointer"
                      >
                        {year}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Week View */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handlePreviousWeek}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex flex-1 justify-center">
                  <div className="grid w-full max-w-2xl grid-cols-8 gap-2">
                    {weekDays.map((dayInfo, index) => (
                      <div key={index} className="text-center">
                        <div className="text-dashboard-text-secondary mb-2 text-sm font-medium">
                          {dayInfo.day}
                        </div>
                        <button
                          onClick={() => handleDateSelect(dayInfo.date)}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-semibold transition-all duration-200 ${
                            format(selectedDate, "dd") ===
                              format(dayInfo.date, "dd") && viewMode === "day"
                              ? "bg-dashboard-selected text-dashboard-selected-text bg-indigo-600 text-white shadow-md"
                              : dayInfo.isCurrentMonth
                                ? "text-dashboard-text-primary hover:bg-accent"
                                : "text-dashboard-text-secondary hover:bg-accent"
                          } `}
                        >
                          {format(dayInfo.date, "dd")}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleNextWeek}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sales Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dashboard-card border-border rounded-2xl border p-6 shadow-sm">
              <div className="text-center">
                <div className="text-dashboard-text-secondary mb-4 text-sm font-medium tracking-wider uppercase">
                  {summaryTitle}{" "}
                  {viewMode === "day" ? "Daily Report" : "Monthly Report"} -{" "}
                  {viewMode === "day" && format(selectedDate, "dd")}{" "}
                  {format(selectedDate, "MMMM").toUpperCase()}
                </div>
                <div className="text-dashboard-text-primary mb-2 text-5xl font-bold">
                  {count}
                </div>
                <div className="text-dashboard-text-secondary text-sm">
                  {viewMode === "day"
                    ? "Report for selected day"
                    : "Report for selected month"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CrudPage
        moduleName="sales"
        data={tableData}
        isLoading={loading}
        modalAction={() => {}}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={""}
        tableColumns={tableHeader}
        totalPages={0}
        state={state}
        isEditMode={isEditMode}
        actions={() => []}
      ></CrudPage>
    </div>
  );
};

export default DateWithTable;
