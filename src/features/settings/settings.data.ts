import { ColumnDef } from "@tanstack/react-table";
import { Department } from "../shared/types/settings-action.types";
import { PERMISION_MODULES } from "@/lib/constant";
import { PermissionModules } from "../shared/types/auth-action.types";

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
  },
  {
    label: "Manage Users & Roles",
    icon: "solar:users-group-rounded-bold-duotone",
    href: "users",
  },
  {
    label: "Notifications",
    icon: "solar:bell-bing-bold",
    href: "notifications",
  },
];

export const settingPagesDescription = {
  general: {
    title: "General",
    description: "General settings for the application",
  },
  security: {
    title: "Security",
    description: "Security settings for the application",
  },
  departments: {
    title: "Manage Departments",
    description: "Manage departments for the application",
  },
  users: {
    title: "Manage Users & Roles",
    description: "Manage users and roles for the application",
  },
  notifications: {
    title: "Notifications",
    description: "Notification settings for the application",
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
    placeholder: "eg 0248765432",
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
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
];
export const defaultPermissions = PERMISION_MODULES.map(
  (item) => PermissionModules[item],
);
