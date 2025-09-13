import { PageBreadcrumb } from "@/features/sales/sales-component-client";
import SalesRecord from "@/features/sales/sales-record";
import PageHeading from "@/features/shared/components/page-heading";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { PermissionProvider } from "@/lib/providers/permission-provider";

export const dynamic = "force-static";

export default async function NewSalePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PermissionProvider permission={PermissionModules.SALES}>
      <PageHeading id={id === "record" ? "" : id} routeLevel={2} />
      <PageBreadcrumb />
      <SalesRecord />
    </PermissionProvider>
  );
}
