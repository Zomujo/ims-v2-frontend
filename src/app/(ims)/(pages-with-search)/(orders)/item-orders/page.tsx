import ItemOrdersList from "@/features/item-orders/item-orders-list";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default async function page() {
  return (
    <PermissionProvider permission={PermissionModules.ITEMS_ORDERS}>
      <ItemOrdersList />
    </PermissionProvider>
  );
}
