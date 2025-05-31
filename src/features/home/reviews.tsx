"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { TESTIMONIALS } from "@/lib/constant";
import styles from "./home.module.css";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Reviews() {
  return (
    <section
      className={cn(
        styles.reviewBackground,
        "flex h-full min-h-[900px] w-full justify-between pt-24 max-lg:flex-col max-lg:gap-8 xl:px-[150px]",
      )}
    >
      <div className="h-full w-full px-8">
        <div className="max-w-xl text-4xl font-bold md:text-5xl">
          What people are really saying after using IMS{" "}
          <span className="text-4xl">❤️</span>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-500">
          What people are saying about IMS .........
        </div>
      </div>
      <div className={cn("w-full", styles.carouselGradientOverlay)}>
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="h-full w-full"
          plugins={[Autoplay()]}
        >
          <CarouselContent className="-mt-1 mr-8 h-[700px] max-lg:ml-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                {TESTIMONIALS.map((item, idx) => (
                  <div
                    key={idx}
                    className="mb-5 flex flex-col items-start gap-4 rounded-3xl bg-white p-6 shadow-md lg:h-[230px]"
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
                        <p className="mb-2 text-sm text-[#64748B]">
                          {item.position}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[#000000]">{item.message}</p>
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
