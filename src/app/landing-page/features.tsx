import Image from "next/image";
import { LANDING_PAGE_IMAGES } from "@/lib/constant";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-6 py-14 lg:px-[120px] lg:py-20"
    >
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#111111] lg:text-[42px]">
          Features
        </h2>
        <p className="mx-auto max-w-2xl text-[#64748B]">
          Efficient drug management for hospitals, clinics, and <br />
          pharmacies. Ensure accuracy, prevent stockouts, and optimize <br />
          your supply chain.
        </p>
      </div>

      <div className="grid gap-10">
        <div className="overflow-hidden">
          <Image
            src={LANDING_PAGE_IMAGES.realTimeDrugsImage}
            alt="Real-Time Drug Tracking"
            width={1920}
            height={1080}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#FFFBEB]">
            <div className="px-6 py-6 md:px-8">
              <h3 className="mb-1 text-lg font-semibold text-[#111111]">
                Manage your drugs with ease
              </h3>
              <p className="mb-3 text-[#64748B] 2xl:mb-7">
                Easily add, remove, and manage your medications for better
                inventory controls
              </p>
            </div>
            <Image
              src={LANDING_PAGE_IMAGES.manageDrugsImage}
              alt="Manage drugs"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="rounded-2xl bg-[#F1F6FD]">
            <div className="px-6 py-6 md:px-8">
              <h3 className="text-lg font-semibold text-[#111111]">
                Stock adjustment
              </h3>
              <p className="mb-4 text-[#64748B]">
                Effortlessly update inventory levels to reflect real-time
                changes and maintain accurate stock counts
              </p>
            </div>
            <Image
              src={LANDING_PAGE_IMAGES.stockImage}
              alt="Stock adjustment"
              width={600}
              height={200}
              className="mx-auto block"
            />
          </div>
          <div className="rounded-2xl bg-[#F0FDF4]">
            <div className="px-6 py-6 md:px-8">
              <h3 className="text-lg font-semibold text-[#111111]">
                Notifications
              </h3>
              <p className="mb-4 text-[#64748B]">
                Get notified on any activity that happens including SMS alerts
              </p>
            </div>
            <Image
              src={LANDING_PAGE_IMAGES.notificationsImage}
              alt="Notifications"
              width={600}
              height={400}
            />
          </div>
          <div className="rounded-2xl bg-[#FEF2F2] lg:col-span-1">
            <div className="px-6 py-6 md:px-8">
              <h3 className="text-lg font-semibold text-[#111111]">
                Manage your suppliers
              </h3>
              <p className="mb-5 text-[#64748B] 2xl:mb-11">
                Add, delete, and deactivate or activate your suppliers
              </p>
            </div>
            <Image
              src={LANDING_PAGE_IMAGES.manageSuppliersImage}
              alt="Manage suppliers"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
