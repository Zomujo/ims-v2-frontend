import {
  PermissionActions,
  PermissionModules,
} from "@/features/shared/types/auth-action.types";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";
import { imsServerPermissions } from "@/lib/config/ims-server-session";

export async function checkServerPermission(
  permission: PermissionModules | string,
) {
  const permissions = await imsServerPermissions();

  if (!permissions) {
    return false;
  }
  const permissionKeys = permissions.map((item) => item.split(":")[0]);
  return permissionKeys.includes(permission);
}

export async function checkServerWritePermission(module: PermissionModules) {
  const permissions = await imsServerPermissions();
  return hasActionPermissionHelper(
    permissions ?? undefined,
    `${module}:${PermissionActions.WRITE}`,
  );
}
