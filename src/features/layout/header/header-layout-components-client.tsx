"use client";

import { ImsButton } from "@/features/shared/components/ims-button";
import { HeadsetIcon } from "lucide-react";

export function ReportIncidentButton() {
  return (
    <ImsButton
      color="primary"
      className="cursor-pointer bg-[#FDF4E8] text-[#794716] hover:bg-[#FDF4E8]"
      endIcon={<HeadsetIcon size={24} />}
    >
      Report Incident
    </ImsButton>
  );
}
