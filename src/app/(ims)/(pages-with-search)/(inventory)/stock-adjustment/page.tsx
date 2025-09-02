import StockAdjustmentList from "@/features/stock-adjustment/stock-adjustment-list";
import { PermissionProvider } from "@/lib/providers/permission-provider";
import { PermissionModules } from "@features/shared/types/auth-action.types";

export default async function page() {
  return (
    <PermissionProvider permission={PermissionModules.STOCK_ADJUSTMENT}>
      <StockAdjustmentList />;
    </PermissionProvider>
  );
}
