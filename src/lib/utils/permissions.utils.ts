export const hasActionPermissionHelper = (
  permissions: string[] | undefined,
  permissionToCheck: string,
) => {
  if (!permissions) return false;

  const [resource, actionToCheck] = permissionToCheck.split(":");

  const matchingPermission = permissions.find((p) =>
    p.startsWith(`${resource}:`),
  );

  if (!matchingPermission) return false;

  const [, actions] = matchingPermission.split(":");

  return actions.includes(actionToCheck);
};
