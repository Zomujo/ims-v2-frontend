import authBgImage from "@public/images/auth-image.jpg";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="grid h-dvh grid-cols-1 justify-center bg-[#FCFCFC] p-4 md:grid-cols-2 dark:bg-[#1A1A1A]">
      {children}
      <Image
        src={authBgImage}
        width={6000}
        height={6000}
        alt="auth-bg"
        className="hidden h-full w-full rounded-2xl md:block"
      />
    </section>
  );
}
