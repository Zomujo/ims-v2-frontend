import { EyeIcon } from "lucide-react";
import React, { JSX } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/features/ui/breadcrumb";
import { Button } from "@/features/ui/button";

type GeneralReportProps = {
  openModal: () => void;
  reportTitle: string;
};
export const GeneralExport = ({
  openModal,
  reportTitle,
}: GeneralReportProps): JSX.Element => {
  return (
    <header className="flex w-full items-end justify-between p-8">
      <div className="flex flex-col items-start gap-5">
        <h1 className="self-stretch text-[32px] leading-normal font-bold text-[#111111]">
          {reportTitle}
        </h1>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/reports"
                className="text-base font-normal text-gray-500 underline"
              >
                Reports
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-base font-normal text-[#111111]">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-base font-bold text-[#111111]">
                {reportTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="-mt-[125px] mr-36 h-10 gap-1.5 rounded-md border border-solid border-slate-300 bg-white p-3 text-base leading-6 font-medium text-[#111111]"
          onClick={openModal}
        >
          <EyeIcon className="h-6 w-6" />
          Preview
        </Button>
      </div>
    </header>
  );
};
