"use client";
import Link from "next/link";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative bg-black pt-16 pb-8 text-white md:pb-16">
      <div className="flex flex-col justify-between gap-12 px-6 md:px-8 lg:flex-row lg:px-[120px]">
        <div className="lg:w-1/3">
          <h2 className="mb-4 text-2xl font-bold">IMS</h2>
          <p className="text-sm leading-relaxed text-white opacity-60">
            IMS is a modern inventory and management solution designed to
            streamline operations for businesses of all sizes. From real-time
            tracking to intelligent analytics, IMS helps you stay in control and
            scale efficiently.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row md:gap-16 lg:gap-20">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase opacity-60">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => scrollToSection("features")}
                className="cursor-pointer hover:underline"
              >
                Features
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase opacity-60">
              Help
            </h3>
            <ul className="space-y-2 text-sm">
              <li
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer hover:underline"
              >
                Contact us
              </li>
              <li
                onClick={() => scrollToSection("faq")}
                className="cursor-pointer hover:underline"
              >
                FAQs
              </li>
              <li>
                <a
                  href="mailto:hello@lims.com"
                  className="cursor-pointer hover:underline"
                >
                  hello@lims.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase opacity-60">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="cursor-pointer hover:underline">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer hover:underline">
                  Instagram
                </Link>
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="cursor-pointer">X</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-black">
                  coming soon
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between px-6 pt-6 text-sm text-white md:flex-row md:px-8 lg:px-[120px]">
        <p>© Copyright 2025 Stealth. All rights reserved.</p>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link href="#" className="hover:underline">
            Privacy policy
          </Link>
          <Link href="#" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden text-center text-[160px] font-bold text-white opacity-5 select-none md:block">
        IMS
      </div>
    </footer>
  );
}
