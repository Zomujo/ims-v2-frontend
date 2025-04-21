import ItemBatchesList from "@/features/items/item-batches-list";
import { PAGE_ROUTES } from "@/lib/constant";
import { redirect, RedirectType } from "next/navigation";

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

  return <ItemBatchesList id={itemId} />;
}
