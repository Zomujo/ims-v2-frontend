import { SessionExpiredHandler } from "@/features/shared/components/session-expired-handler";
import { Suspense } from "react";

export default function SessionExpiredPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionExpiredHandler />
    </Suspense>
  );
}
