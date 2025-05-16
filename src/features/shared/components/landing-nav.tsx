"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    targetId: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 z-50 w-full overflow-hidden bg-white py-2 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 lg:px-[120px]">
          <div className="flex items-center space-x-2">
            <h1 className="cursor-pointer text-2xl font-bold text-[#111111]">
              IMS
            </h1>
            <span className="cursor-pointer rounded-full bg-[#FF6E66] px-[12px] py-1 text-xs font-bold text-white">
              BETA
            </span>
            <ul className="hidden items-center space-x-8 pl-[120px] text-[#111111] lg:flex">
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#features">Features</a>
              </li>
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#pricing">Pricing</a>
              </li>
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#blog">Blog</a>
              </li>
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#reviews">Reviews</a>
              </li>
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#faq">Faq</a>
              </li>
              <li className="cursor-pointer hover:text-[#FF6E66]">
                <a href="#contact">Contact us</a>
              </li>
            </ul>
          </div>

          <div className="hidden items-center space-x-4 lg:flex">
            <button className="cursor-pointer text-gray-700 hover:text-[#FF6E66] hover:underline">
              Login
            </button>
            <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Book a demo
            </button>
          </div>

          <button
            className="cursor-pointer text-2xl text-gray-700 hover:text-[#FF6E66] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
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

            <button
              className="cursor-pointer text-2xl hover:text-[#FF6E66]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaTimes />
            </button>
          </div>

          <ul className="mt-8 space-y-6 px-6 text-lg font-medium">
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "features")}
            >
              Features
            </li>
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "pricing")}
            >
              Pricing
            </li>
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "blog")}
            >
              Blog
            </li>
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "reviews")}
            >
              Reviews
            </li>
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "faq")}
            >
              Faq
            </li>
            <li
              className="cursor-pointer border-b border-[#a7afb6] pb-2 hover:text-[#FF6E66]"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Contact us
            </li>
          </ul>

          <div className="mt-12 px-4 text-center">
            <button className="w-full cursor-pointer rounded-[12px] bg-white px-6 py-3 text-lg font-medium text-[#415BE6] hover:bg-gray-100">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
