import { SettingsSidebar } from "@/features/settings/settings-component-client";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="flex h-[94%] flex-col gap-y-4 rounded-2xl md:gap-x-8 md:gap-y-0 xl:flex-row">
      <SettingsSidebar />
      {children}
    </section>
  );
}
