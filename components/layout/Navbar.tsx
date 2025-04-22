"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [doctorsDropdown, setDoctorsDropdown] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServicesDropdown = () => {
    setServicesDropdown(!servicesDropdown);
    setDoctorsDropdown(false);
  };
  const toggleDoctorsDropdown = () => {
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
    <nav className={`fixed top-0 w-full z-50 transition-all h-20 duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-bold ${textColor}`}>
              MedCare Hospital
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className={`${textColor} `}>
              About Us
            </Link>

            <div className="relative">
              <button onClick={()=> router.push('/services')}
                onMouseEnter={toggleServicesDropdown}
                className={`flex items-center ${textColor}  transition-colors duration-300`}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdown && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link
                    href="/services#emergency"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Emergency Care
                  </Link>
                  <Link
                    href="/services#surgery"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Specialized Surgery
                  </Link>
                  <Link
                    href="/services#lab"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Laboratory Services
                  </Link>
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </div>

            <div
             className="relative">
              <button onClick={()=> router.push('/doctors')}
                 onMouseEnter={toggleDoctorsDropdown}
                className={`flex items-center ${textColor}  transition-colors duration-300`}
              >
                Find a Doctor <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {doctorsDropdown && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <Link
                    href="/hfeuhfes"
                   
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Cardiology
                  </Link>
                  <Link
                    href="/doctors?specialty=neurology"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Neurology
                  </Link>
                  <Link
                    href="/doctors?specialty=pediatrics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Pediatrics
                  </Link>
                  <Link
                    href="/doctors"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    All Specialists
                  </Link>
                </div>
              )}
            </div>

            <Link href="/#news" className={`${textColor} `}>
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
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
            >
              Services
            </Link>
            <Link
              href="/doctors"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
            >
              Find a Doctor
            </Link>
            <Link
              href="/#news"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-50 rounded-md"
            >
              News & Events
            </Link>
            <Link
              href="/#appointment"
              className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center"
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
