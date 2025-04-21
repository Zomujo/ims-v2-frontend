"use client";
import SalesCart from "./sales-cart";
import SalesItemList from "./sales-item-list";
import SalesPatientList from "./sales-patient-list";

export default function SalesRecord() {
  return (
    <section className="flex h-[95%] w-full gap-x-3 rounded-2xl bg-white">
      <div className="flex-1">
        <SalesPatientList />
        <SalesItemList />
      </div>
      <SalesCart />
    </section>
  );
}
