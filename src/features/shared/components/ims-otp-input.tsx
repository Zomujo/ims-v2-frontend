import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/features/ui/input-otp";
import React from "react";

export default function ImsOTPInput({
  otpBoxes,
  ...props
}: Readonly<{ otpBoxes: number }>) {
  return (
    <InputOTP {...props} maxLength={otpBoxes}>
      <InputOTPGroup className="w-full gap-x-4">
        {Array.from({ length: otpBoxes }, (_, i) => i).map((item, index) => {
          return (
            <InputOTPSlot
              key={item}
              index={index}
              defaultValue={"O"}
              className="h-17 w-[40%] rounded-2xl! border text-2xl"
            />
          );
        })}
      </InputOTPGroup>
    </InputOTP>
  );
}
