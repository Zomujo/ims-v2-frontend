import React from "react";
import { cn } from "@/lib/utils";
import { IMSDataTable } from "@/features/shared/components/ims-data-table";
import { Dialog, DialogContent, DialogHeader } from "@/features/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";

export interface Metrics {
  totalItems: number;
  totalRevenue: number;
  currency?: string;
}

export interface SalesSummaryModalProps<T = unknown> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  clinicName?: string;
  reportDate?: string;
  metrics: Metrics;
  rowData: T[];
  columnData: ColumnDef<T>[];
  className?: string;
}

export function PreviewModal<T>({
  isOpen,
  onClose,
  title = "",
  clinicName = "",
  reportDate,
  metrics,
  rowData,
  className,
  columnData,
}: SalesSummaryModalProps<T>) {
  const formatDate = (date?: string) => {
    if (!date) {
      const now = new Date();
      return `As of ${now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`;
    }
    return date;
  };

  const formatCurrency = (amount: number, currency = "GHC") => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent
        className={cn(
          "max-h-[90vh] max-w-4xl min-w-5xl gap-0 overflow-y-auto p-0",
          className,
        )}
      >
        {/* Header Section */}
        <div className="rounded-t-lg bg-[#EBF6FF] px-8 py-6">
          <div className="flex items-start justify-between">
            <DialogHeader className="space-y-2">
              <h2 className="text-foreground text-2xl font-semibold">
                {title}
              </h2>
            </DialogHeader>
            <div className="mt-5 text-right">
              <div className="text-foreground text-sm font-medium">
                {clinicName}
              </div>
              <div className="text-muted-foreground text-sm">
                {formatDate(reportDate)}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="bg-background px-8 py-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                TOTAL ITEMS
              </div>
              <div className="text-foreground text-2xl font-bold">
                {metrics.totalItems.toString().padStart(1, "0")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                TOTAL REVENUE
              </div>
              <div className="text-foreground text-2xl font-bold">
                {formatCurrency(metrics.totalRevenue, metrics.currency)}
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <IMSDataTable<T, unknown>
            columns={columnData}
            data={rowData}
            totalPages={0}
            isLoading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
