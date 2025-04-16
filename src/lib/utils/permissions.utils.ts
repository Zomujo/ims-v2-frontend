import {
  PermissionActions,
  PermissionModules,
} from "@/features/shared/types/auth-action.types";
import { imsServerSession } from "../config/auth.config";

type PermissionMap = Record<
  PermissionModules,
  Record<PermissionActions, boolean>
>;

export const transformPermissionsToMap = async (module: PermissionModules) => {
  const session = await imsServerSession();
  const permissions = session?.user?.permissions ?? [];
  const permissionsModuleMap = permissions.reduce((accumulator, permission) => {
    const [page, actions] = permission.split(":") as [
      PermissionModules,
      PermissionActions,
    ];
    return {
      ...accumulator,
      [page]: actions.split("_").reduce(
        (acc, action) => {
          return {
            ...acc,
            [action]: true,
          };
        },
        {} as Record<PermissionActions, boolean>,
      ),
    };
  }, {} as PermissionMap);

  const modulePermissions = permissionsModuleMap[module];
  return {
    access: modulePermissions,
  };
};
