import { Input } from "@/features/ui/input";
import { CalendarIcon } from "lucide-react";
import React from "react";

type ReportInfoProps = {
  setReportName: (name: string) => void;
  setExportName: (exportName: string) => void;
};
const ReportInfo = ({ setExportName, setReportName }: ReportInfoProps) => {
  return (
    <div className="mx-6">
      <div className="flex w-full flex-col items-start gap-8">
        <div className="w-full text-lg font-bold text-[#111111]">General</div>

        <div className="flex w-full items-start gap-6">
          <div className="flex flex-1 flex-col items-start gap-2.5">
            <div className="w-full text-base leading-6 font-medium text-[#111111]">
              Report name
            </div>
            <Input
              className="shadow-shadows-xs h-[43px] rounded-xl border border-solid border-slate-200 bg-white"
              placeholder="Eg: Inventory management"
              onChange={(event) => setReportName(event.target.value)}
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-2.5">
            <div className="w-full text-base leading-6 font-normal text-[#111111]">
              <span className="font-medium text-[#111111]">
                Name in export{" "}
              </span>
              <span className="font-medium text-slate-500">(optional)</span>
            </div>
            <Input
              className="shadow-shadows-xs h-[43px] rounded-xl border border-solid border-slate-200 bg-white"
              placeholder="Eg: Inventory management"
              onChange={(event) => setExportName(event.target.value)}
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-2.5"></div>
        </div>
      </div>
    </div>
  );
};
export default ReportInfo;
