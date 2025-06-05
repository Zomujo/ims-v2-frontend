import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type ReportAccordionType = {
  title: string;
  type: string;
  reportReference: {
    name: string;
    id: string;
    quantity?: number | string;
  }[];
};

export const ReportAccordion = ({
  title,
  type,
  reportReference,
}: ReportAccordionType) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div
        className={cn(
          "mt-[12px] flex h-12 items-center rounded-xl border-1 bg-[#f5f5f5] px-3.5 text-[14px] font-medium text-gray-700",
          showDropdown && "sticky top-0",
        )}
      >
        <div className="flex items-center justify-center">
          <p> {title}</p>{" "}
          <span className="ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#Fef3c7] text-xs font-medium">
            {" "}
            {reportReference.length}
          </span>
        </div>
        <div className="ml-auto" onClick={() => setShowDropdown(!showDropdown)}>
          <Icon
            icon="solar:alt-arrow-down-linear"
            fontSize={24}
            className={cn("transition-all", showDropdown && "rotate-180")}
          />
        </div>
      </div>
      {reportReference.map(({ name, id, quantity }) => (
        <div
          key={id}
          className={cn(
            "w-auto overflow-hidden transition-all duration-300",
            !showDropdown && "hidden w-0",
          )}
        >
          <div className="mt-[12px] flex rounded-xl border px-[18px] py-[23px]">
            <div className="w-[36%] font-medium text-[#415be6]">
              <p className="truncate pr-4">{name} </p>
            </div>
            <div className="w-[38%]">
              <p className="truncate pr-4 text-[#111111]">{type}</p>
            </div>
            <p className="text-[#111111]">{quantity}</p>
          </div>
        </div>
      ))}
    </>
  );
};
