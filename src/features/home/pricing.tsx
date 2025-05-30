import Image from "next/image";
import whiteCheckedImage from "@public/images/checked.svg";
import blueCheckedImage from "@public/images/checkmark.svg";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen w-full bg-gradient-to-b from-[#dbe0fa] to-[#f1f5fa] py-20 lg:py-28 xl:px-[150px]"
    >
      <div className="flex w-full flex-col items-center justify-center max-md:px-8">
        <h2 className="mb-4 w-full max-w-lg text-center text-4xl font-bold text-[#000000] lg:text-5xl">
          Pick a plan that's <span className="text-[#415BE6]">right</span> for
          you
        </h2>
        <p className="mb-12 max-w-2xl text-center text-lg text-gray-600 md:mb-16 lg:mb-20">
          Choose from our two plans — Standard and Premium or contact us for
          more details about our custom plans
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row">
          <div className="h-full w-full max-w-[440px] rounded-2xl bg-white p-1 shadow-lg lg:h-[570px]">
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-r from-[#5D6EF7] to-[#95a4f0] px-6 py-12 text-white md:px-8">
              <span className="absolute -top-4 right-8 z-50 rounded-[10px] bg-[#EC007A] px-4 py-2 text-sm font-bold text-white">
                ⚡ Most Popular
              </span>
              <div className="text-left tracking-wide">
                <h3 className="mb-1 text-xl font-semibold md:text-2xl">
                  Premium
                </h3>
                <p className="mb-8">Do more with IMS</p>
                <div className="text-3xl font-bold md:text-[44px]">
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
                    src={whiteCheckedImage}
                    alt="checkmark"
                    width={20}
                    height={20}
                  />
                  Save 30%
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src={whiteCheckedImage}
                    alt="checkmark"
                    width={20}
                    height={20}
                  />
                  50,000 credits one time
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src={whiteCheckedImage}
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
          <div className="h-full w-full max-w-[435px] rounded-2xl bg-white px-8 py-10 text-gray-900 shadow-md md:mt-20 md:h-[480px] lg:mt-16 lg:h-[500px]">
            <div className="text-left tracking-wide">
              <h3 className="mb-1 text-xl font-semibold text-[#000000] md:text-2xl">
                Standard
              </h3>
              <p className="mb-6">Get started with IMS</p>
              <div className="text-3xl font-bold md:text-[44px]">
                Ghc 80 <span className="text-sm font-medium">per month</span>
              </div>
              <h4 className="my-6 font-semibold text-gray-700">Description</h4>
              <h5 className="my-2 text-sm font-semibold text-gray-700">
                BENEFITS
              </h5>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <Image
                  src={blueCheckedImage}
                  alt="checked"
                  width={20}
                  height={20}
                />
                Free credits for a month
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src={blueCheckedImage}
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
