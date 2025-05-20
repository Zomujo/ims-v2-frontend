import ItemOrdersList from "@/features/item-orders/item-orders-list";
import { getItemsNoPaginate } from "@/features/shared/actions/items.actions";
import { getSuppliersNoPaginate } from "@/features/shared/actions/supplier.actions";
import { checkServerPermission } from "@/lib/providers/server-permission-provider";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export default async function page() {
  const hasPermission = await checkServerPermission(
    PermissionModules.ITEMS_ORDERS,
  );

  if (!hasPermission) {
    return (
      <PermissionProvider permission={PermissionModules.ITEMS_ORDERS}>
        <div>This content will never be shown</div>
      </PermissionProvider>
    );
  }
  const [suppliers, items] = await Promise.all([
    getSuppliersNoPaginate(),
    getItemsNoPaginate(),
  ]);

  return <ItemOrdersList items={items ?? []} suppliers={suppliers ?? []} />;
}
