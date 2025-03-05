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
    // Add a start ellipsis if currentPage is greater than 3
    const showEllipsisStart = currentPage > 3;

    // Add a start ellipsis if currentPage is less than totalPages - 2
    const showEllipsisEnd = currentPage < totalPages - 2;

    pagesArr.push(1);

    if (showEllipsisStart) {
      pagesArr.push("ellipsis-start");
    }

    // This part creates the pages around the current page. 4,5,6 where active page is 5
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

    // This returns an array of numbers as well as the strings ['ellipsis-start' , 'ellipsis-end']
    return pagesArr;
  };

  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="rounded-tl-[5px] rounded-bl-[5px] border-[1px] border-r-0">
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
                  page !== currentPage
                    ? "text-pagination-inactive cursor-pointer !rounded-none"
                    : "!rounded-none bg-[#F9FAFB]"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem className="rounded-tr-[5px] rounded-br-[5px] border-[1px] border-l-0">
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
