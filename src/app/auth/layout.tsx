import authBgImage from "@public/images/pharmacy.jpg";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <section className="grid h-dvh grid-cols-1 justify-center gap-x-10 bg-[#FCFCFC] p-4 lg:grid-cols-2 dark:bg-[#1A1A1A]">
      {children}
      <Image
        src={authBgImage}
        width={6000}
        height={6000}
        alt="auth-bg"
        className="hidden h-[calc(100vh_-_30px)] w-[50vw] rounded-2xl object-cover lg:block"
      />
    </section>
  );
}
