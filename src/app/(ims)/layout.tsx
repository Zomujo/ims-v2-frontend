import { HeaderLayout } from "@/features/layout/header/header-layout";
import { PropsWithChildren } from "react";

export default function EntryLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <HeaderLayout />
      <main className="bg-black">{children}</main>
    </>
  );
}
