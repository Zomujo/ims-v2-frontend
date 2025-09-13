import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";
import ExpiryItemsList from "@features/expiry/expiry-items-list";

export const dynamic = "force-static";

export default function page() {
  return (
    <PermissionProvider permission={PermissionModules.ITEMS}>
      <h3 className="pt-4">All items</h3>
      <ExpiryItemsList />
    </PermissionProvider>
  );
}
