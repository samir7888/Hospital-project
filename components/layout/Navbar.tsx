"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [doctorsDropdown, setDoctorsDropdown] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const doctorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesDropdown(false);
      }
      if (
        doctorsRef.current &&
        !doctorsRef.current.contains(event.target as Node)
      ) {
        setDoctorsDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when toggling dropdown
    setServicesDropdown(!servicesDropdown);
    setDoctorsDropdown(false);
  };

  const toggleDoctorsDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when toggling dropdown
    setDoctorsDropdown(!doctorsDropdown);
    setServicesDropdown(false);
  };

  const navBg = isHomePage
    ? isScrolled
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md";

  const textColor = isHomePage && !isScrolled ? "text-white" : "text-gray-800";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all h-20 duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-bold ${textColor}`}>
              GastroCare Hospital
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className={`${textColor}`}>
              About Us
            </Link>

            <div className="relative " ref={servicesRef}>
              <button
                onClick={toggleServicesDropdown}
                className={`flex items-center cursor-pointer ${textColor} transition-colors duration-300`}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdown && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link
                    href="/services#emergency"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setServicesDropdown(false)}
                  >
                    Emergency Care
                  </Link>
                  <Link
                    href="/services#surgery"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setServicesDropdown(false)}
                  >
                    Specialized Surgery
                  </Link>
                  <Link
                    href="/services#lab"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setServicesDropdown(false)}
                  >
                    Laboratory Services
                  </Link>
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setServicesDropdown(false)}
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={doctorsRef}>
              <button
                onClick={toggleDoctorsDropdown}
                className={`flex items-center cursor-pointer ${textColor} transition-colors duration-300`}
              >
                Find a Doctor <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {doctorsDropdown && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link
                    href="/doctors?specialty=cardiology"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setDoctorsDropdown(false)}
                  >
                    Cardiology
                  </Link>
                  <Link
                    href="/doctors?specialty=neurology"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setDoctorsDropdown(false)}
                  >
                    Neurology
                  </Link>
                  <Link
                    href="/doctors?specialty=pediatrics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setDoctorsDropdown(false)}
                  >
                    Pediatrics
                  </Link>
                  <Link
                    href="/doctors"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => setDoctorsDropdown(false)}
                  >
                    All Specialists
                  </Link>
                </div>
              )}
            </div>

            <Link href="/news" className={`${textColor}`}>
              News & Events
            </Link>
            <Link
              href="/#appointment"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Book Appointment
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className={textColor}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
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
