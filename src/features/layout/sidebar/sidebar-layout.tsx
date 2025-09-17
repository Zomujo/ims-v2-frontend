"use client";
import { ImsButton } from "@/features/shared/components/ims-button";
import ImsNavTab from "@/features/shared/components/ims-nav-tab";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/features/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/features/ui/sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronDown, Pill, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { generalTabs, helpTabs } from "./sidebar.data";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { useSessionData } from "@/hooks/useSessionData";

export default function SidebarLayout() {
  const [isPharmaOpen, setIsPharmaOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { isLoading, facilityName, role } = useSessionData();
  const { hasPermission } = useSessionData();

  const canShowCollapsible = (sub: { permission: string }[]) => {
    return sub.some(({ permission }) => {
      if (permission) {
        return hasPermission(permission);
      }
      return true;
    });
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Sidebar
        className="h-full bg-white pr-0"
        variant="inset"
        collapsible="offcanvas" // Collapses to icons when closed
      >
        {/* Header */}
        <SidebarHeader className="bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-800">Stealth</span>
              <Badge variant="destructive" className="text-xs">
                BETA
              </Badge>
            </div>
            {/* Toggle Button (visible on mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden" // Hide on larger screens
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Pill className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">
              {facilityName} - {role}
            </span>
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="bg-white">
          {/* GENERAL Section */}
          <SidebarGroup className="space-y-1">
            <SidebarGroupLabel className="text-xs text-gray-500 uppercase">
              General
            </SidebarGroupLabel>
            {generalTabs.map((tab) => {
              const isActive = (tab.subs ?? []).some((sub) =>
                pathname.includes(sub.link ?? ""),
              );
              return (
                <SidebarMenu key={tab.name}>
                  {/* Overview */}
                  {!tab.subs
                    ? (!tab.permission || hasPermission(tab.permission)) && (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <ImsNavTab
                              href={tab.link ?? ""}
                              icon={tab.icon}
                              label={tab.name}
                            />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    : canShowCollapsible(tab.subs) && (
                        <SidebarMenuItem>
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                onClick={() => setIsPharmaOpen(!isPharmaOpen)}
                                className="flex items-center justify-start"
                                isActive={isActive}
                                asChild
                              >
                                <ImsButton
                                  className="relative flex py-6 text-gray-500"
                                  variant="ghost"
                                  endIcon={
                                    <ChevronDown className="absolute top-[40%] right-2 h-4 w-4" />
                                  }
                                  startIcon={<Icon icon={tab.icon} />}
                                >
                                  {tab.name}
                                </ImsButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="mr-0 space-y-1 pr-0">
                                {tab.subs.map(
                                  (sub) =>
                                    (!sub.permission ||
                                      hasPermission(sub.permission)) && (
                                      <SidebarMenuSubItem key={sub.name}>
                                        <SidebarMenuSubButton asChild>
                                          <ImsNavTab
                                            href={sub.link ?? ""}
                                            icon={sub.icon}
                                            label={sub.name}
                                          />
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    ),
                                )}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        </SidebarMenuItem>
                      )}
                </SidebarMenu>
              );
            })}
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-gray-500 uppercase">
              Help & Support
            </SidebarGroupLabel>
            {helpTabs.map((tab) => {
              return (
                <SidebarMenu key={tab.name}>
                  <SidebarMenuItem className="mb-2">
                    <SidebarMenuButton asChild>
                      <ImsNavTab
                        href={tab.link ?? ""}
                        icon={tab.icon}
                        label={tab.name}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              );
            })}
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="bg-white p-4">
          {/*TODO: We will implement the theme switcher later*/}
          {/*<div className="mb-2 flex items-center justify-between">*/}
          {/*  <Sun className="h-5 w-5" />*/}
          {/*  <Switch*/}
          {/*    checked={theme === "dark"}*/}
          {/*    onCheckedChange={(checked) =>*/}
          {/*      setTheme(checked ? "dark" : "light")*/}
          {/*    }*/}
          {/*  />*/}
          {/*  <Moon className="h-5 w-5" />*/}
          {/*</div>*/}
          <p className="text-xs text-gray-500">
            Stealth {new Date().getFullYear()} - ALL rights reserved
          </p>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
