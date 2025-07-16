import {
  PermissionActions,
  PermissionModules,
} from "@/features/shared/types/auth-action.types";
import { imsServerSession } from "@/lib/config/auth.config";
import { hasActionPermissionHelper } from "@/lib/utils/permissions.utils";

export async function checkServerPermission(
  permission: PermissionModules | string,
) {
  const session = await imsServerSession();

  if (!session?.user?.permissions) {
    return false;
  }
  const permissionKeys = session.user.permissions.map(
    (item) => item.split(":")[0],
  );
  return permissionKeys.includes(permission);
}

export async function checkServerWritePermission(module: PermissionModules) {
  const session = await imsServerSession();
  return hasActionPermissionHelper(
    session?.user.permissions,
    `${module}:${PermissionActions.WRITE}`,
  );
}
