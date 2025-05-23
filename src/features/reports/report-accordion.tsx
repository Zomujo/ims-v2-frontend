import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type ReportAccordionType = {
  title: string;
  type: string;
  reportReference: {
    name: string;
    id: string;
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
      <div className="mt-[12px] flex h-12 items-center rounded-xl border-1 bg-[#f5f5f5] px-3.5 text-[14px] font-medium text-gray-700">
        <div className="flex items-center justify-center">
          <p> {title}</p>{" "}
          <span className="ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#Fef3c7] text-xs font-medium">
            {" "}
            6
          </span>
        </div>
        <div className="ml-auto" onClick={() => setShowDropdown(!showDropdown)}>
          <Icon
            icon="solar:alt-arrow-down-linear"
            fontSize={24}
            className={cn("transition-all", !showDropdown && "rotate-180")}
          />
        </div>
      </div>
      {reportReference.map(({ name, id }) => (
        <div
          key={id}
          className={cn(
            "w-auto overflow-hidden transition-all duration-300",
            showDropdown && "w-0",
          )}
        >
          <div className="mt-[12px] flex rounded-xl border px-[18px] py-[23px]">
            <div className="w-[37%] font-medium text-[#415be6]">
              <p>{name} </p>
            </div>
            <p className="text-[#111111]">{type}</p>
          </div>
        </div>
      ))}
    </>
  );
};
