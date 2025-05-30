import { HeaderLayout } from "@/features/layout/header/header-layout";
import SidebarLayout from "@/features/layout/sidebar/sidebar-layout";
import PageHeading from "@/features/shared/components/page-heading";
import { SidebarProvider } from "@/features/ui/sidebar";
import { PropsWithChildren } from "react";
import { PageHeadingProvider } from "@/hooks/usePageHeading";

export default function EntryLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <HeaderLayout />
      <SidebarProvider>
        <SidebarLayout />
        <PageHeadingProvider>
          <main className="fixed right-4 bottom-4 flex h-[calc(97dvh-var(--header-height))] w-[calc(98.5dvw-var(--sidebar-width))] flex-col gap-y-4 overflow-hidden rounded-2xl border bg-[#FAFAFA] p-5">
            <PageHeading />
            {children}
          </main>
        </PageHeadingProvider>
      </SidebarProvider>
    </>
  );
}
