import Image from "next/image";
import OptimizeInventoryImage from "@public/images/hospital.jpg";
import LocalPharmacyImage from "@public/images/local-pharmacies.jpg";

export default function OptimizeInventory() {
  return (
    <section className="flex h-auto w-full flex-col gap-8 bg-[#111111] py-14 lg:h-screen lg:gap-20 lg:pt-20 xl:px-[150px]">
      <div className="grid w-full grid-cols-1 gap-4 px-8 text-white lg:grid-cols-2 lg:gap-16">
        <h3 className="text-3xl font-bold tracking-wide md:text-[42px]">
          Optimizing Inventory for Healthcare Providers
        </h3>
        <p className="tracking-wide opacity-60">
          Whether you're a hospital or a local pharmacy, IMS streamlines stock
          management, enhances operational efficiency, and ensures
          compliance—helping you deliver exceptional care to your community.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 px-8 lg:grid-cols-2">
        <div className="relative w-full">
          <Image
            src={OptimizeInventoryImage}
            alt="Optimize Inventory"
            className="h-full w-full rounded-2xl lg:w-[95%]"
            width={492}
            height={400}
          />
          <div className="absolute right-1 bottom-[1px] left-[1px] w-full rounded-b-2xl bg-transparent px-6 py-4 backdrop-blur-lg md:px-10 lg:w-[95%]">
            <h5 className="mb-2 font-medium tracking-wide text-white md:mb-3">
              Hospitals
            </h5>
            <p className="text-xs tracking-wide text-white opacity-60 md:text-sm">
              Efficient drug management for hospitals. Ensure accuracy, <br />
              prevent stockouts, and optimize your supply chain.
            </p>
          </div>
        </div>
        <div className="relative w-full">
          <Image
            src={LocalPharmacyImage}
            alt="local and ruralpahrmacy"
            className="h-full w-full rounded-2xl lg:w-[95%]"
            width={492}
            height={400}
          />
          <div className="absolute right-1 bottom-[1px] left-0 w-full rounded-b-2xl bg-transparent px-10 py-4 backdrop-blur-lg lg:w-[95%]">
            <h5 className="font-medium tracking-wide text-white">
              Local and Rural Pharmacies
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
