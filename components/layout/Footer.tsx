import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { serverFetch } from "@/lib/server-fetch";
import { CompanyInfoResponse } from "@/app/types/company-type";
import { SiteSettings } from "@/app/types/sitesetting-type";
import Image from "next/image";

const Footer: React.FC = async () => {
  const companyInfo = await serverFetch<CompanyInfoResponse>("company-info");
  const footerDescription = await serverFetch<string>(
    "general-setting/footer-description"
  );
  const SiteSettings = await serverFetch<SiteSettings>("general-setting");
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            {SiteSettings?.logo?.url ? (
              <Image
                width={160}
                height={160}
                src={SiteSettings?.logo?.url}
                alt={SiteSettings?.companyName || "GastroCare Hospital"}
                className="w-16 h-16 object-cover object-center"
              />
            ) : (
              <h3 className="text-xl font-bold mb-4">
                {SiteSettings?.companyName || "GastroCare Hospital"}
              </h3>
            )}
            <p className="text-blue-100 mb-4">
              {SiteSettings?.siteDescription || footerDescription}
            </p>

            <div className="flex space-x-4 mt-4">
              {companyInfo?.socialProfiles?.map((profile) => {
                const iconProps = {
                  size: 20,
                  className: "text-blue-200 hover:text-white transition-colors",
                };
                const Icon = (() => {
                  switch (profile.network) {
                    case "facebook":
                      return Facebook;
                    case "twitter":
                      return Twitter;
                    case "instagram":
                      return Instagram;
                    case "linkedin":
                      return Linkedin;
                    default:
                      return null;
                  }
                })();

                return (
                  Icon && (
                    <Link
                      key={profile.network}
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon {...iconProps} />
                    </Link>
                  )
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link
                  href="/#appointment"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-300 mt-0.5" />
                <span>
                  {companyInfo?.city || "123 Medical Center Drive"},
                  {companyInfo?.address || "Anytown, ST 12345"}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-300" />
                <span>
                  {companyInfo?.phone?.join(", ") || "(123) 456-7890"}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-300" />
                <span>
                  {companyInfo?.email?.join(", ") || "info@medcarehospital.com"}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hours of Operation</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-blue-300 mt-0.5" />
                <div>
                  <p className="font-semibold">Emergency Care</p>
                  <p>24 hours / 7 days Link week</p>
                </div>
              </li>
              {/* <li className="mt-3">
                <p className="font-semibold">Outpatient Services</p>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 12:00 PM</p>
                <p>Sunday: Closed</p>
              </li> */}
              <li className="mt-3">
                <p className="font-semibold">Visiting Hours</p>
                <p>
                  {companyInfo?.workingHours || "Daily: 10:00 AM - 8:00 PM"}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()} {SiteSettings?.companyName}. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
