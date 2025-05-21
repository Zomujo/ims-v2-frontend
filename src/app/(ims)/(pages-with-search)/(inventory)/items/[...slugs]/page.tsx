import ItemBatchesList from "@/features/items/item-batches-list";
import { getSuppliersNoPaginate } from "@/features/shared/actions/supplier.actions";
import { PAGE_ROUTES } from "@/lib/constant";
import { redirect, RedirectType } from "next/navigation";
import { getItem } from "@features/shared/actions/items.actions";
import { checkServerPermission } from "@/lib/providers/server-permission-provider";
import { PermissionModules } from "@features/shared/types/auth-action.types";

export default async function ItemBatches({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const hasPermission = await checkServerPermission(
    PermissionModules.SUPPLIERS,
  );
  const { slugs } = await params;
  const [itemId, pageRoute] = slugs;
  if ((!itemId || !pageRoute) && pageRoute !== PAGE_ROUTES.ITEM_BATCHES) {
    redirect(PAGE_ROUTES.ITEMS.VIEW, RedirectType.replace);
  }
  const suppliers = hasPermission ? await getSuppliersNoPaginate() : [];
  const { data } = await getItem(itemId);

  return (
    <ItemBatchesList
      suppliers={suppliers ?? []}
      itemId={itemId}
      oneItem={data}
    />
  );
}
