"use client";
import { getSalesItemsAction } from "../shared/actions/sales.action";
import useFetchData from "../shared/hooks/use-fetch-data";
import SalesCart from "./sales-cart";
import SalesItemList from "./sales-item-list";
import SalesPatientList from "./sales-patient-list";

export default function SalesRecord() {
  const { data } = useFetchData({
    fetchFn: getSalesItemsAction,
  });
  const salesItems = data?.rows ?? [];

  return (
    <section className="flex h-[95%] w-full gap-x-3 rounded-2xl bg-white">
      <div className="flex-1">
        <SalesPatientList />
        <SalesItemList
          salesItems={salesItems}
          totalPages={data?.totalPages ?? 0}
        />
      </div>
      <SalesCart />
    </section>
  );
}
