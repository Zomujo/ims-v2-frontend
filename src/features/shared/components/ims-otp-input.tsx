import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/features/ui/input-otp";
import { cn } from "@/lib/utils";
import React from "react";

export default function ImsOTPInput({
  otpBoxes,
  className,
  ...props
}: Readonly<{ otpBoxes: number; className?: string }>) {
  return (
    <InputOTP {...props} maxLength={otpBoxes}>
      <InputOTPGroup className="w-full gap-x-4">
        {Array.from({ length: otpBoxes }, (_, i) => i).map((item, index) => {
          return (
            <InputOTPSlot
              key={item}
              index={index}
              defaultValue={"O"}
              className={cn(
                "h-17 w-[40%] rounded-2xl! border text-2xl",
                className,
              )}
            />
          );
        })}
      </InputOTPGroup>
    </InputOTP>
  );
}
