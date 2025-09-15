import ItemsList from "@/features/items/items-list";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default function page() {
  return (
    <PermissionProvider permission={PermissionModules.ITEMS}>
      <h3 className="pt-4">All items</h3>
      <ItemsList />
    </PermissionProvider>
  );
}
