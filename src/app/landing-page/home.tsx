"use client";
import Image from "next/image";
import { heroImage, partnerImage, hospitalImage } from "@/lib/constant";
import NavigationBar from "@features/shared/components/landing-nav";

export default function Home() {
  return (
    <div className="flex h-auto w-full flex-col overflow-hidden bg-white lg:h-screen lg:max-w-full">
      <NavigationBar />
      <section className="flex w-full flex-col gap-2 px-6 py-12 md:px-8 lg:px-[100px] lg:py-20">
        <div className="container grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          <div className="w-full">
            <div className="mb-6 flex items-center space-x-2 rounded-lg bg-[#FDF8E5] px-4 py-[10px] text-[#6A5E34] lg:w-[85%]">
              <span className="text-sm">⭐</span>
              <p className="text-sm">
                Access our premier inventory for pharmacies and hospitals
              </p>
            </div>
            <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
              Streamline Your <br /> Pharmaceutical <br /> Inventory
            </h1>
            <p className="mb-8 text-lg text-[#64748B]">
              Efficient drug management for hospitals, clinics, and pharmacies.
              Ensure accuracy, prevent stockouts, and optimize your supply
              chain.
            </p>
            <div className="flex space-x-4">
              <button className="cursor-pointer rounded-lg bg-[#415BE6] px-6 py-3 text-lg text-white hover:bg-blue-700">
                Contact us
              </button>
              <button className="cursor-pointer rounded-lg bg-[#E2E8F0] px-6 py-3 text-lg text-[#111111] hover:bg-gray-300">
                Book a demo
              </button>
            </div>
          </div>

          <div className="w-full">
            <Image
              src={heroImage}
              alt="Pharmacist"
              className="h-full w-full lg:rounded-2xl"
              width={492}
              height={740}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <Image
              src={partnerImage}
              alt="Trusted partner"
              className="mx-auto"
              width={80}
              height={80}
            />
          </div>
          <h3 className="mb-6 text-lg text-[#111111]">
            Trusted by top Hospitals, Clinics and Pharmacies
          </h3>
          <div className="flex justify-center space-x-4">
            <Image
              src={hospitalImage}
              alt="korlebu"
              className="h-auto w-20"
              width={80}
              height={80}
            />
            <Image
              src={hospitalImage}
              alt="korlebu"
              className="h-auto w-20"
              width={80}
              height={80}
            />
            <Image
              src={hospitalImage}
              alt="korlebu"
              className="h-auto w-20"
              width={80}
              height={80}
            />
            <Image
              src={hospitalImage}
              alt="korlebu"
              className="h-auto w-20"
              width={80}
              height={80}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
