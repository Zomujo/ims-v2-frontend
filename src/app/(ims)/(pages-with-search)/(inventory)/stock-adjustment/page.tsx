import { getItemsNoPaginate } from "@/features/shared/actions/items.actions";
import StockAdjustmentList from "@/features/stock-adjustment/stock-adjustment-list";

export default async function page() {
  const items = await getItemsNoPaginate();
  return <StockAdjustmentList items={items ?? []} />;
}
