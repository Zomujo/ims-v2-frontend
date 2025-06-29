"use client";
import {
  NotificationButton,
  UserProfileButton,
} from "./header-layout-components-server";
import { ReportIncidentButton } from "./header-layout-components-client";
import { Menu } from "lucide-react";
import { useSidebar } from "@/features/ui/sidebar";

export function HeaderLayout() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="fixed top-0 z-5 flex h-(--header-height) w-[calc(100%)] items-center justify-between gap-2 bg-white pr-6">
      <Menu
        className="ml-4 h-5 w-5 min-w-4 cursor-pointer md:hidden"
        onClick={toggleSidebar}
      />
      <HeaderLayoutUIActions />
    </header>
  );
}

function HeaderLayoutUIActions() {
  return (
    <div className="ml-auto flex items-center gap-x-6">
      <ReportIncidentButton />
      <NotificationButton />
      <UserProfileButton />
    </div>
  );
}
