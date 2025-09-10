"use client";
import { lazy, Suspense, useState } from "react";
import { ImsButton } from "@features/shared/components/ims-button";
import { ImsSheet } from "../shared/components/ims-sheet";
import { Skeleton } from "@features/ui/skeleton";

const SalesCart = lazy(() => import("./sales-cart"));
const SalesItemList = lazy(() => import("./sales-item-list"));
const SalesPatientList = lazy(() => import("./sales-patient-list"));

export default function SalesRecord() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [patientId, setPatientId] = useState<string | undefined>(undefined);

  return (
    <section className="relative flex h-[95%] w-full gap-x-3 rounded-2xl bg-white pb-20 md:pb-0">
      <div className="w-full space-y-4 overflow-x-auto overflow-y-hidden">
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <SalesPatientList
            setPatientIdAction={setPatientId}
            patientId={patientId}
          />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <SalesItemList />
        </Suspense>
      </div>

      <div className="hidden w-full max-w-md min-w-sm lg:block">
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <SalesCart />
        </Suspense>
      </div>
      <ImsSheet
        onOpenChange={() => setIsCartVisible(false)}
        open={isCartVisible}
      >
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <SalesCart patientCardId={patientId} />
        </Suspense>
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
