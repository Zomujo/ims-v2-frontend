import Image from "next/image";
import { LANDING_PAGE_IMAGES } from "@/lib/constant";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen bg-gradient-to-b from-[#dbe0fa] to-[#f1f5fa] px-6 py-16 md:px-8 lg:px-[120px] lg:py-20"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#000000]">
          Pick a plan that's <span className="text-[#415BE6]">right</span>{" "}
          <br /> for you
        </h2>
        <p className="mb-12 text-[#475569] md:mb-20 lg:mb-16">
          Choose from our two plans — Standard and Premium or contact us for
          more <br /> details about our custom plans
        </p>

        <div className="flex flex-col gap-8 md:grid-cols-2 md:flex-row md:items-center md:justify-center md:gap-3 lg:gap-4">
          <div className="h-full w-full rounded-2xl bg-white p-1 shadow-lg lg:h-[570px] lg:w-[440px]">
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-r from-[#5D6EF7] to-[#95a4f0] px-8 py-12 text-white">
              <span className="absolute -top-4 right-8 rounded-[10px] bg-[#EC007A] px-4 py-2 text-sm font-bold text-white">
                ⚡ Most Popular
              </span>
              <div className="text-left tracking-wide">
                <h3 className="mb-1 text-2xl font-semibold">Premium</h3>
                <p className="mb-8 text-sm">Do more with IMS</p>
                <div className="text-[44px] font-bold">
                  Ghc100 <span className="text-sm font-medium">per month</span>
                </div>
                <h4 className="my-6 font-semibold">Description</h4>
                <p className="text-sm font-medium text-white">
                  EVERYTHING IN STANDARD AND MORE &gt;&gt;&gt;
                </p>
              </div>

              <ul className="my-5 space-y-2 text-sm">
                <li className="flex items-center gap-3">
                  <Image
                    src={LANDING_PAGE_IMAGES.whiteCheckedImage}
                    alt="checkmark"
                    width={20}
                    height={20}
                  />
                  Save 30%
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src={LANDING_PAGE_IMAGES.whiteCheckedImage}
                    alt="checkmark"
                    width={20}
                    height={20}
                  />
                  50,000 credits one time
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src={LANDING_PAGE_IMAGES.whiteCheckedImage}
                    alt="checkmark"
                    width={20}
                    height={20}
                  />
                  Record your patients
                </li>
              </ul>
              <button className="mt-8 mb-0 w-full cursor-pointer rounded-xl bg-white py-3 font-medium text-[#111111] hover:bg-gray-100">
                Contacts us
              </button>
            </div>
          </div>
          <div className="h-full w-full rounded-2xl bg-white px-8 py-10 text-gray-900 shadow-md md:mt-20 md:h-[480px] lg:mt-16 lg:h-[500px] lg:w-[435px]">
            <div className="text-left tracking-wide">
              <h3 className="mb-1 text-2xl font-semibold text-[#000000]">
                Standard
              </h3>
              <p className="mb-6 text-sm">Get started with IMS</p>
              <div className="text-[44px] font-bold">
                Ghc 80 <span className="text-sm font-medium">per month</span>
              </div>
              <h4 className="my-6 text-sm font-semibold text-gray-700">
                Description
              </h4>
              <h5 className="my-2 text-sm font-semibold text-gray-700">
                BENEFITS
              </h5>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <Image
                  src={LANDING_PAGE_IMAGES.blueCheckedImage}
                  alt="checked"
                  width={20}
                  height={20}
                />
                Free credits for a month
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src={LANDING_PAGE_IMAGES.blueCheckedImage}
                  alt="checked"
                  width={20}
                  height={20}
                />
                1000 credits per month
              </li>
            </ul>
            <button className="mt-8 w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-3 font-medium text-[#111111] hover:bg-gray-50 md:mt-12">
              Contacts us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
