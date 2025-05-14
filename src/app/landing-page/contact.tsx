import Image from "next/image";
import { LANDING_PAGE_IMAGES } from "@/lib/constant";

export default function Contact() {
  return (
    <section id="contact" className="relative flex w-full flex-col bg-white">
      <div className="relative grid h-auto w-full grid-cols-1 gap-0 lg:h-[65vh] lg:grid-cols-2">
        <div className="flex w-full flex-col gap-4 bg-gradient-to-b from-[#2A3FAC] to-[#e5e4ed] px-6 py-20 md:px-8 lg:h-full lg:px-[120px] lg:py-32">
          <h6 className="font-bold tracking-wide text-white uppercase">
            Do you run a pharmacy? get in touch
          </h6>
          <h4 className="text-4xl font-bold tracking-wide text-white md:text-[42px]">
            Empower <span className="text-[#FE9748]">Rural</span> <br />{" "}
            Pharmacies with IMS
          </h4>
          <p className="my-6 tracking-wide text-white opacity-60">
            Effortlessly manage inventory, streamline reordering, reduce waste,
            and boost operational efficiency—all within a single, easy-to-use
            app designed specifically to meet the needs of modern pharmacies.
          </p>
          <div className="flex w-fit flex-col gap-3 lg:flex-row lg:items-center">
            <button className="cursor-pointer rounded-lg bg-white px-6 py-2 font-medium text-[#111] hover:bg-gray-100">
              Book a demo
            </button>
            <button className="cursor-pointer rounded-lg bg-[#5967ab] px-6 py-2 font-medium text-white hover:bg-gray-100 hover:text-[#111]">
              Contact us
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 bg-gradient-to-b from-[#CCE0FF] to-[#e5e4ed] px-6 py-20 md:px-8 lg:h-full lg:px-[120px] lg:py-32">
          <h6 className="font-bold tracking-wide text-[#111]">
            ACCESS YOUR IMS INVENTORY
          </h6>
          <h4 className="text-4xl font-bold tracking-wide text-[#111] md:text-[42px]">
            Access your <span className="text-[#64748B]">dashboard</span> <br />{" "}
            and start inventorying
          </h4>
          <p className="my-6 tracking-wide text-[#64748B]">
            Stay organized and in control with real-time inventory tracking
            right from your dashboard. Simply enter your email, password, and
            facility details to access all the tools you need for efficient
            management.
          </p>
          <div className="flex items-center gap-3">
            <button className="cursor-pointer rounded-lg bg-[#415BE6] px-6 py-3 font-medium text-white hover:bg-blue-700">
              Login or sign up
            </button>
          </div>
        </div>
      </div>
      <Image
        src={LANDING_PAGE_IMAGES.accessImage}
        alt="pharmacist"
        width={734}
        height={562}
        className="absolute top-[28%] -right-8 w-[80%] md:top-[4.5%] md:-right-14 md:w-[734px] lg:top-[35%] lg:right-0 lg:left-[16%] 2xl:left-[22%]"
      />
    </section>
  );
}
