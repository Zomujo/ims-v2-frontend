"use client";

import { PAGE_ROUTES } from "@/lib/constant";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function ShowItemsDashboard({ children }: Readonly<PropsWithChildren>) {
  const pathName = usePathname();
  if (pathName === PAGE_ROUTES.ITEMS.VIEW) return children;
  return null;
}
