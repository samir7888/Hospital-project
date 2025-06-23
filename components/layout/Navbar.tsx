"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import GoogleTranslate from "../google-translator";
import { SiteSettings } from "@/app/types/sitesetting-type";
import Image from "next/image";

const Navbar = ({ siteSetting }: { siteSetting: SiteSettings }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navBg = isHomePage
    ? isScrolled
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md";

  const textColor = isHomePage && !isScrolled ? "text-white" : "text-gray-800";

  return (
    <nav
      className={`fixed top-0 px-3  w-full z-50 transition-all h-20 duration-300 ${navBg}`}
    >
      <section className="container mx-auto ">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/">
              {siteSetting?.primaryLogo?.url ? (
                <Image
                  width={460}
                  height={160}
                  src={siteSetting?.primaryLogo?.url}
                  alt={siteSetting?.companyName}
                  className="w-fit h-16 object-cover object-center"
                />
              ) : (
                <h3 className={`text-2xl font-bold ${textColor}`}>
                  {siteSetting?.companyName}
                </h3>
              )}
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/about" className={`${textColor}`}>
              About Us
            </Link>

            <div>
              <Link
                href="/services"
                className={`flex items-center cursor-pointer ${textColor} transition-colors duration-300`}
              >
                Services
              </Link>
            </div>

            <div>
              <Link
                href="/doctors"
                className={`flex items-center cursor-pointer ${textColor} transition-colors duration-300`}
              >
                Find a Doctor
              </Link>
            </div>
            <div>
              <Link
                href="/news"
                className={`flex items-center cursor-pointer ${textColor} transition-colors duration-300`}
              >
                News and Events
              </Link>
            </div>

            <Link
              href="/#appointment"
              className="bg-orange-darkest text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 hidden xl:flex"
            >
              Book Appointment
            </Link>

            <GoogleTranslate />
          </div>
          <div
            className={`absolute right-5 top-16 ${isScrolled ? "hidden" : ""}`}
          ></div>

          <div className="lg:hidden flex items-center">
            <button onClick={()=> {
              toggleMenu()
            }} className={textColor}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/doctors"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Find a Doctor
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              News & Events
            </Link>
            <Link
              href="/#appointment"
              className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
