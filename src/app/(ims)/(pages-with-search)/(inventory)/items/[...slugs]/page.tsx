import ItemBatchesList from "@/features/items/item-batches-list";
import { getSuppliersNoPaginate } from "@/features/shared/actions/supplier.actions";
import { PAGE_ROUTES } from "@/lib/constant";
import { redirect, RedirectType } from "next/navigation";
import { getItem } from "@features/shared/actions/items.actions";

export default async function ItemBatches({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const [itemId, pageRoute] = slugs;
  if ((!itemId || !pageRoute) && pageRoute !== PAGE_ROUTES.ITEM_BATCHES) {
    redirect(PAGE_ROUTES.ITEMS.VIEW, RedirectType.replace);
  }
  const suppliers = await getSuppliersNoPaginate();
  const { data } = await getItem(itemId);

  return (
    <ItemBatchesList
      suppliers={suppliers ?? []}
      itemId={itemId}
      oneItem={data}
    />
  );
}
