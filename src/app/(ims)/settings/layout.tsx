import React, { PropsWithChildren, Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicSettingsSidebar = dynamic(() =>
  import("@/features/settings/settings-component-client").then(
    (mod) => mod.SettingsSidebar,
  ),
);

export default function layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="flex h-[94%] flex-col gap-y-4 rounded-2xl md:gap-x-8 md:gap-y-0 xl:flex-row">
      <Suspense fallback={<div className="w-64 rounded-2xl bg-white p-6" />}>
        <DynamicSettingsSidebar />
      </Suspense>
      {children}
    </section>
  );
}
