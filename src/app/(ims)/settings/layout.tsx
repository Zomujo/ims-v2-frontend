import { SettingsSidebar } from "@/features/settings/settings-component-clinet";
import { PropsWithChildren } from "react";

export default function layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="flex h-full gap-x-8 rounded-2xl">
      <SettingsSidebar />
      {children}
    </section>
  );
}
