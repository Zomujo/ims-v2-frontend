import { handleRequestState } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import {
  changeEmailAction,
  changeAccountInfoAction,
  verifyChangeMailOtpAction,
} from "../shared/actions/settings.actions";

export const handleEmailChange = async (
  email: string,
  action?: Dispatch<SetStateAction<boolean>>,
) => {
  const res = changeEmailAction(email);
  handleRequestState({ res, loadingMsg: "Sending OTP..." });
  res.then(() => {
    action?.(true);
  });
};

export const handleAccountInfoChange = async ({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) => {
  const res = changeAccountInfoAction({ fullName, phoneNumber });
  handleRequestState({ res, loadingMsg: "Updating account info..." });
};

export const handleEmailChangeOtp = async (
  {
    email,
    otpCode,
  }: {
    email: string;
    otpCode: number;
  },
  action?: Dispatch<SetStateAction<boolean>>,
) => {
  const res = verifyChangeMailOtpAction({ email, otp: otpCode });
  handleRequestState({ res, loadingMsg: "Verifying OTP..." });
  res.then(() => {
    action?.(false);
  });
};

export const readImgFile = ({
  setImg,
  file,
}: {
  setImg: Dispatch<SetStateAction<string | null>>;
  file: File;
}) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    setImg(e.target?.result as string);
  };
  reader.readAsDataURL(file);
};
