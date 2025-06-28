"use client";
import { useParams } from "next/navigation";
import { ImsButton } from "@features/shared/components/ims-button";
import { useState } from "react";
import { authVerificationSendMailAction } from "@features/shared/actions/auth.action";
import { handleRequestState } from "@/lib/utils";

export default function AuthTokenExpired() {
  const { encodedEmail } = useParams();
  const email = atob(decodeURIComponent(encodedEmail as string));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResendVerificationEmail = async () => {
    setIsSubmitting(true);
    const res = authVerificationSendMailAction(email);
    handleRequestState({
      res,
      loadingMsg: "Resending verification email...",
      successMsg: "Verification email sent successfully.",
      errorMsg: "Failed to resend verification email. Try again.",
    });
    await res;
    setIsSubmitting(false);
  };

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-between gap-4">
      <span className="text-sm font-medium text-gray-500">
        Verification Link sent to {email} has expired. Click the link below to
        send a new link
      </span>
      <ImsButton
        isLoading={isSubmitting}
        disabled={isSubmitting}
        onClick={handleResendVerificationEmail}
        isLoadingLabel="Resending verification email"
        variant="imsPrimary"
        className="order-last mt-10 h-12 cursor-pointer justify-self-end md:order-none"
        type="submit"
      >
        Send Verification Email Again
      </ImsButton>
    </div>
  );
}
