import { SettingsSidebar } from "@/features/settings/settings-component-clinet";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="flex h-[94%] gap-x-8 rounded-2xl">
      <SettingsSidebar />
      {children}
    </section>
  );
}
