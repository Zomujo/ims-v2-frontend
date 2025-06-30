import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

type ReportAccordionType = {
  title: string;
  type: string;
  reportReference: {
    name: string;
    id: string;
    quantity?: number | string;
    total?: number | string;
  }[];
  loading?: boolean;
  openAccordion?: boolean;
};

export const ReportAccordion = ({
  title,
  type,
  reportReference,
  loading,
  openAccordion = false,
}: ReportAccordionType) => {
  const [showDropdown, setShowDropdown] = useState(openAccordion);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reportReference.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setShowDropdown(openAccordion);
  }, [openAccordion]);
  return (
    <>
      <div
        className={cn(
          "mt-[12px] flex h-12 items-center rounded-xl border-1 bg-[#f5f5f5] px-3.5 text-[14px] font-medium text-gray-700",
          showDropdown && "sticky top-0 z-10 bg-[#f5f5f5]",
        )}
      >
        {loading ? (
          <div className="flex w-full animate-pulse items-center justify-between">
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="h-6 w-6 rounded-full bg-gray-300" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <p>{title}</p>
              <span className="ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#Fef3c7] text-xs font-medium">
                {reportReference.length}
              </span>
            </div>
            <div
              className="ml-auto cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Icon
                icon="solar:alt-arrow-down-linear"
                fontSize={24}
                className={cn("transition-all", showDropdown && "rotate-180")}
              />
            </div>
          </>
        )}
      </div>

      {showDropdown && (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {showDropdown && (
        <div className="mt-3">
          {filteredReports.length > 0 ? (
            filteredReports.map(({ name, id, quantity, total }, index) => (
              <div
                key={id + index}
                className="mt-[12px] flex rounded-xl border px-[18px] py-[23px]"
              >
                <div className="w-[36%] font-medium text-[#415be6]">
                  <p className="truncate pr-4">{name}</p>
                </div>
                <div className="w-[38%]">
                  <p className="truncate pr-4 text-[#111111]">
                    {total || type}
                  </p>
                </div>
                <p className="text-[#111111]">{quantity}</p>
              </div>
            ))
          ) : (
            <p className="mt-4 pb-2 text-center text-sm text-gray-500">
              {loading ? "Loading..." : "No items found."}
            </p>
          )}
        </div>
      )}
    </>
  );
};
