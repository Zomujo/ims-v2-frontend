// components/ui/data-table.tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/ui/table";
import { DynamicPagination } from "./pagination";
import { Skeleton } from "@/features/ui/skeleton";

// Define props for the DataTable component
type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages?: number;
  isLoading?: boolean;
};

export function IMSDataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  isLoading,
}: Readonly<DataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table className="border-separate border-spacing-y-4 space-y-3">
        <TableHeader className="table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="table-row h-12 w-full rounded-xl border bg-neutral-50 px-3 dark:bg-neutral-800"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="border-y text-xs font-semibold uppercase first:rounded-l-2xl first:border-l first:pl-4 last:rounded-r-2xl last:border-r"
                  key={header.id}
                >
                  {isLoading ? (
                    <Skeleton className="h-4 bg-gray-300" />
                  ) : header.isPlaceholder ? null : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    ) || <span className="invisible">Action</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="space-y-3 text-xs">
          {isLoading ? (
            Array.from({ length: columns.length }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns.length }).map(
                  (_column, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 bg-gray-300" />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-18 rounded-xl py-5"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="border-y first:rounded-l-2xl first:border-l first:pl-4 last:rounded-r-2xl last:border-r"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!!totalPages && (
        <DynamicPagination className="pb-40 md:pb-28" totalPages={totalPages} />
      )}
    </div>
  );
}
