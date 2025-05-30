import { getItemsNoPaginate } from "@/features/shared/actions/items.actions";
import StockAdjustmentList from "@/features/stock-adjustment/stock-adjustment-list";
import { PermissionProvider } from "@/lib/providers/permission-provider";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { checkServerPermission } from "@/lib/providers/server-permission-provider";

export default async function page() {
  const hasPermission = await checkServerPermission(
    PermissionModules.STOCK_ADJUSTMENT,
  );

  if (!hasPermission) {
    return (
      <PermissionProvider permission={PermissionModules.STOCK_ADJUSTMENT}>
        <div>This content will never be shown</div>
      </PermissionProvider>
    );
  }

  const items = await getItemsNoPaginate();
  return <StockAdjustmentList items={items ?? []} />;
}
