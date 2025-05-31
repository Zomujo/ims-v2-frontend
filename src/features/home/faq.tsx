"use client";
import Image from "next/image";
import { useState } from "react";
import { FAQs } from "@/lib/constant";
import faqImage from "@public/images/faq.jpg";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 lg:py-24 xl:px-[150px]">
      <div className="flex flex-col items-start gap-12 px-6 md:px-8 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <h2 className="mb-4 text-4xl font-bold tracking-wide text-[#111111] lg:text-5xl">
            Frequently asked <br /> Questions
          </h2>
          <p className="text-lg tracking-wide text-[#64748B] lg:mb-16">
            We answered questions so you don’t have to ask them.
          </p>
          <div className="hidden h-full w-full rounded-3xl lg:block">
            <Image
              src={faqImage}
              alt="Pharmacist"
              width={430}
              height={400}
              className="h-full w-full rounded-3xl lg:w-[80%]"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              className={`border-b ${
                activeIndex === index
                  ? "rounded-2xl border-b-0 bg-[#F8FAFC]"
                  : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-lg font-medium text-[#111] hover:bg-[#F8FAFC] focus:outline-none"
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="tracking-wide text-[#111]" />
                ) : (
                  <ChevronDown className="tracking-wide text-[#111]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="cursor-pointer px-6 pb-6 tracking-wide text-[#64748B]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-full w-full rounded-3xl lg:hidden">
          <Image
            src={faqImage}
            alt="Pharmacist"
            width={430}
            height={400}
            className="h-full w-full rounded-3xl lg:w-[80%]"
          />
        </div>
      </div>
    </section>
  );
}
