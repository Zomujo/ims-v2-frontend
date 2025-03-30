import { HeaderLayout } from "@/features/layout/header/header-layout";
import PageHeading from "@/features/shared/components/page-heading";
import { PropsWithChildren } from "react";

export default function EntryLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <HeaderLayout />
      <main className="flex h-[calc(100dvh-5.5rem)] flex-col gap-y-8 overflow-hidden bg-[#FAFAFA] px-8 pt-8 pb-7">
        <PageHeading />
        {children}
      </main>
    </>
  );
}
