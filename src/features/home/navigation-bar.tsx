"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navigations = [
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "Blog", id: "blog" },
    { label: "Contact us", id: "contact" },
  ];

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 z-50 w-full overflow-hidden bg-white py-2 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 lg:px-[100px]">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-[#111111]">IMS</h1>
            <span className="cursor-pointer rounded-full bg-[#FF6E66] px-[12px] py-1 text-xs font-bold text-white">
              BETA
            </span>
            <ul className="hidden items-center space-x-8 pl-[80px] text-[#111111] lg:flex">
              {navigations.map((nav) => (
                <li
                  key={nav.id}
                  className="cursor-pointer hover:text-[#FF6E66]"
                  onClick={() => scrollToSection(nav.id)}
                >
                  {nav.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center space-x-4 lg:flex">
            <Link href="/auth/login">
              <button className="cursor-pointer text-gray-700 hover:text-[#FF6E66] hover:underline">
                Login
              </button>
            </Link>
            <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Book a demo
            </button>
          </div>

          <button
            className="text-2xl text-gray-700 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-[#415BE6] font-medium text-white lg:hidden">
          <div className="container mx-auto flex items-center justify-between px-7 py-6 md:px-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">IMS</h1>
              <span className="rounded-full bg-[#FF6E66] px-2 py-1 text-xs text-white">
                BETA
              </span>
            </div>

            <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              <X />
            </button>
          </div>
          <ul className="mt-8 space-y-6 px-6 text-lg font-medium">
            {navigations.map((nav) => (
              <li
                key={nav.id}
                className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
                onClick={() => {
                  scrollToSection(nav.id);
                  setMenuOpen(false);
                }}
              >
                {nav.label}
              </li>
            ))}
          </ul>
          <div className="mt-12 px-4 text-center">
            <Link href="/auth/login">
              <button className="w-full cursor-pointer rounded-[12px] bg-white px-6 py-3 text-lg font-medium text-[#415BE6] hover:bg-gray-100">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
