import { PermissionModules } from "@/features/shared/types/auth-action.types";
import { imsServerSession } from "@/lib/config/auth.config";

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
