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

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface DynamicPaginationProps {
  totalPages: number;
}

export function DynamicPagination({ totalPages }: DynamicPaginationProps) {
  const searchParams = useSearchParams();
  const activePage = searchParams.get("page")
    ? +(searchParams.get("page") as string)
    : 1;

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
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false }); // Update query without scrolling
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page as number)}
                className={
                  page !== currentPage ? "hover:bg-accent cursor-pointer" : ""
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
