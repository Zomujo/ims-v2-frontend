import ItemsList from "@/features/items/items-list";
import { getItemCategoriesNoPaginate } from "@/features/shared/actions/item-categories.actions";
export default async function page() {
  const categories = await getItemCategoriesNoPaginate();
  return (
    <>
      <h3 className="pt-4">All items</h3>
      <ItemsList categories={categories} />
    </>
  );
}
