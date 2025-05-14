import { LANDING_PAGE_IMAGES, TESTIMONIALS } from "@/lib/constant";
import Image from "next/image";

export default function Reviews() {
  return (
    <section className="grid grid-cols-1 gap-0 bg-[#FFFAEB] pt-20 pb-8 md:gap-8 lg:grid-cols-2 lg:gap-0 lg:pb-0">
      <div className="mb-16 text-left">
        <div className="mb-4 px-6 md:px-8 lg:px-[120px]">
          <h2 className="text-3xl font-bold text-[#111111] md:text-5xl">
            What people are really <br /> saying after using IMS ❤️
          </h2>
          <p className="mt-4 text-[#64748B]">
            What people are saying about IMS .........
          </p>
        </div>
        <Image
          src={LANDING_PAGE_IMAGES.heartImage}
          alt="Heart"
          width={750}
          height={590}
          className="m-0 hidden p-0 lg:block"
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-8 px-6 md:px-8 lg:gap-0 lg:pl-[120px]">
        {TESTIMONIALS.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-md lg:h-[230px] lg:w-[85%]"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[#000000]">
                  {item.name}
                </h4>
                <p className="mb-2 text-sm text-[#64748B]">{item.position}</p>
              </div>
            </div>
            <p className="text-sm text-[#000000]">{item.message}</p>
            <div className="mt-4 ml-auto">
              <Image
                src={LANDING_PAGE_IMAGES.linkedInImage}
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
