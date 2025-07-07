"use client";
import { useState } from "react";
import SalesCart from "./sales-cart";
import SalesItemList from "./sales-item-list";
import SalesPatientList from "./sales-patient-list";
import { ImsButton } from "@features/shared/components/ims-button";
import { ImsSheet } from "../shared/components/ims-sheet";

export default function SalesRecord() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <section className="relative flex h-[95%] w-full gap-x-3 rounded-2xl bg-white pb-20 md:pb-0">
      <div className="w-full space-y-4 overflow-x-auto overflow-y-hidden">
        <SalesPatientList />
        <SalesItemList />
      </div>

      <div className="hidden w-full max-w-md min-w-sm lg:block">
        <SalesCart />
      </div>
      <ImsSheet
        onOpenChange={() => setIsCartVisible(false)}
        open={isCartVisible}
      >
        <SalesCart />
      </ImsSheet>

      {!isCartVisible && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 lg:hidden">
          <ImsButton
            variant="imsPrimary"
            onClick={() => setIsCartVisible((prev) => !prev)}
          >
            View Cart
          </ImsButton>
        </div>
      )}
    </section>
  );
}
