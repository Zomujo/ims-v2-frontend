import SalesList from "@/features/sales/sales-list";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export const dynamic = "force-static";

export default function SalesPage() {
  return (
    <PermissionProvider permission={PermissionModules.SALES}>
      <SalesList />
    </PermissionProvider>
  );
}
