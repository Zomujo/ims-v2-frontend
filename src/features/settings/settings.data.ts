import { ColumnDef } from "@tanstack/react-table";
import { Department } from "../shared/types/settings-action.types";
import { PERMISION_MODULES } from "@/lib/constant";
import { PermissionModules } from "../shared/types/auth-action.types";
import { formateDate } from "@/lib/utils";

export const settingsSidebarNavItems = [
  {
    label: "General",
    icon: "solar:user-plus-bold-duotone",
    href: "general",
  },
  {
    label: "Security",
    icon: "solar:key-minimalistic-square-2-bold",
    href: "security",
  },
  {
    label: "Manage Departments",
    icon: "solar:buildings-bold-duotone",
    href: "departments",
    permission: "departments",
  },
  {
    label: "Manage Users & Roles",
    icon: "solar:users-group-rounded-bold-duotone",
    href: "users",
    permission: "users",
  },
  {
    label: "Notifications",
    icon: "solar:bell-bing-bold",
    href: "notifications",
  },
  {
    label: "Expiry",
    icon: "mdi:timer-sand",
    href: "expiry",
    permission: "departments",
  },
];

export const settingPagesDescription = {
  general: {
    title: "General",
    description: "Configure basic preferences and application-wide settings.",
  },
  security: {
    title: "Security",
    description:
      "Manage authentication, access policies, and security controls.",
  },
  departments: {
    title: "Manage Departments",
    description:
      "Organize and maintain department structures within the application.",
  },
  users: {
    title: "Manage Users & Roles",
    description: "Control user accounts, roles, and access permissions.",
  },
  notifications: {
    title: "Notifications",
    description: "Customize notification preferences and delivery methods.",
  },
  expiry: {
    title: "Expiry",
    description: "Track, review, and manage expired or near-expiry medicines.",
  },
} as const;

export const settingsAccountInfoFields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "tel",
    placeholder: "eg. +233248765432",
  },
];

export const settingsDepartmentTableColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdBy?.fullName",
    header: "Created By",
    cell: ({ row }) => {
      return row.original.createdBy?.fullName ?? "-";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return formateDate(row.original.createdAt);
    },
  },
];
export const defaultPermissions = PERMISION_MODULES.map(
  (item) => PermissionModules[item],
);
