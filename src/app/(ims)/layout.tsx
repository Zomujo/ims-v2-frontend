import { HeaderLayout } from "@/features/layout/header/header-layout";
import SidebarLayout from "@/features/layout/sidebar/sidebar-layout";
import PageHeading from "@/features/shared/components/page-heading";
import { SidebarProvider } from "@/features/ui/sidebar";
import { PropsWithChildren } from "react";

export default function EntryLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <HeaderLayout />
      <SidebarProvider className="pr-4 pb-4">
        <SidebarLayout />
        <main className="mt-(--header-height) flex min-h-[calc(100%-var(--header-height))] w-full flex-col gap-y-8 overflow-hidden rounded-2xl border bg-[#FAFAFA] p-8">
          <PageHeading />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
