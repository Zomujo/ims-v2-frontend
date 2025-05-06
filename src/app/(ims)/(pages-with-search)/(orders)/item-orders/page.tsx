import ItemOrdersList from "@/features/item-orders/item-orders-list";
import { getItemsNoPaginate } from "@/features/shared/actions/items.actions";
import { getSuppliersNoPaginate } from "@/features/shared/actions/supplier.actions";

export default async function page() {
  const [suppliers, items] = await Promise.all([
    getSuppliersNoPaginate(),
    getItemsNoPaginate(),
  ]);

  return <ItemOrdersList items={items ?? []} suppliers={suppliers ?? []} />;
}
