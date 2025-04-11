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
import { Switch } from "@/features/ui/switch";
import { ChevronDown, Menu, Moon, Pill, Sun, X } from "lucide-react";
import { useState } from "react";
import { generalTabs, helpTabs } from "./sidebar.data";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SidebarLayout() {
  const [isPharmaOpen, setIsPharmaOpen] = useState(false);
  const { open, setOpen } = useSidebar(); // Access sidebar state

  return (
    <Sidebar
      className="fixed z-10 h-full bg-white"
      variant="inset"
      collapsible="icon" // Collapses to icons when closed
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
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Pill className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">Madina Hospital - Admin</span>
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
            return (
              <SidebarMenu key={tab.name}>
                {/* Overview */}
                {!tab.subs ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <ImsNavTab
                        href={tab.link ?? ""}
                        icon={tab.icon}
                        label={tab.name}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => setIsPharmaOpen(!isPharmaOpen)}
                          className="flex items-center justify-start"
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
                          {tab.subs.map((sub) => (
                            <SidebarMenuSubItem key={sub.name}>
                              <SidebarMenuSubButton asChild>
                                <ImsNavTab
                                  href={sub.link ?? ""}
                                  icon={sub.icon}
                                  label={sub.name}
                                />
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
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
                <SidebarMenuItem>
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
        <div className="mb-2 flex items-center justify-between">
          <Sun className="h-5 w-5" />
          <Switch
          // checked={theme === "dark"}
          // onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
          <Moon className="h-5 w-5" />
        </div>
        <p className="text-xs text-gray-500">
          Stealth 2024 - ALL rights reserved
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
