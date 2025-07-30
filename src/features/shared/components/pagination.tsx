"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/ui/pagination";
import { cn } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalNotifications } from "@features/notifications/notifications-context";

type DynamicPaginationProps = {
  totalPages: number;
  className?: string;
  setPage: (page: number) => void;
};

export function DynamicPagination({
  totalPages,
  className,
  setPage,
}: Readonly<DynamicPaginationProps>) {
  const searchParams = useSearchParams();
  const activePage = searchParams.get("page")
    ? +(searchParams.get("page") as string)
    : 1;
  const { isConnected } = useGlobalNotifications();

  const currentPage = Math.max(1, Math.min(activePage, totalPages));

  const router = useRouter();

  const getPageNumbers = () => {
    const pagesArr = [];
    const showEllipsisStart = currentPage > 3;

    const showEllipsisEnd = currentPage < totalPages - 2;

    pagesArr.push(1);

    if (showEllipsisStart) {
      pagesArr.push("ellipsis-start");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pagesArr.push(i);
    }

    if (showEllipsisEnd) {
      pagesArr.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pagesArr.push(totalPages);
    }

    return pagesArr;
  };

  const onPageChange = (newPage: number) => {
    if (isConnected) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());

      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      setPage(newPage);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem className="rounded-tl-[5px] rounded-bl-[5px] border-[1px] border-r-0">
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={cn({
              "pointer-events-none opacity-50": currentPage === 1,
              "cursor-pointer": currentPage !== 1,
            })}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {pageNumbers.map((page) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${page}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
                className={cn({
                  "text-pagination-inactive cursor-pointer !rounded-none":
                    page !== currentPage,
                  "!rounded-none bg-[#F9FAFB]": page === currentPage,
                })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem className="rounded-tr-[5px] rounded-br-[5px] border-[1px] border-l-0">
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={cn({
              "pointer-events-none opacity-50": currentPage === totalPages,
              "cursor-pointer": currentPage !== totalPages,
            })}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
