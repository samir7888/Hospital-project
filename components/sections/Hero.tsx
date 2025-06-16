import { HomePageData } from "@/app/types/heropage-type";
import { serverFetch } from "@/lib/server-fetch";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Metadata } from "next";
import { CompanyInfoResponse } from "@/app/types/company-type";

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await serverFetch<HomePageData>("home-page");

  return {
    title: aboutData?.metadata?.title || " GastroCare Hospital",
    description:
      aboutData?.metadata?.description ||
      "Learn more about our hospital and its values.",
    keywords: aboutData?.metadata?.keywords || [
      "hospital",
      "healthcare",
      "about us",
    ],
  };
}

const Hero: React.FC = async () => {
  const [homePageData, companyInfo] = await Promise.all([
    serverFetch<HomePageData>("home-page"),
    serverFetch<CompanyInfoResponse>("company-info"),
  ]);

  return (
    <div className="relative flex flex-col">
      {/* Main Hero Section */}
      <div className="relative" style={{ minHeight: "calc(100vh - 80px)" }}>
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              homePageData?.heroSection?.image?.url ||
              "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260"
            })`,
            backgroundPosition: "center 25%",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8  w-full">
            <div className="container mx-auto  text-center">
              <h1 className="text-4xl xl:text-5xl 2xl:text-8xl font-extrabold text-white  animate-fade-in text-center leading-[3rem] md:leading-[6rem] text-shadow-2xs capitalize">
                {homePageData?.heroSection?.title ||
                  "Your Health Is Our Priority"}
              </h1>
              <p className="mt-4 text-xl text-center text-blue-100 animate-fade-in-delay capitalize">
                {homePageData?.heroSection?.subtitle ||
                  "Delivering compassionate care and medical excellence to our community for over 35 years."}
              </p>
              <div className="mt-8 flex flex-col justify-center sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
                {homePageData?.heroSection.cta.map((cta, index) => (
                  <Link key={index} href={cta.link}>
                    <Button
                      variant={cta.variant}
                      className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-full transition-colors duration-300 cursor-pointer capitalize"
                    >
                      {cta.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar - Now positioned relatively */}
      <div className="bg-white shadow-lg md:transform md:translate-y-1/2 z-10 relative md:absolute md:bottom-0 md:left-0 md:right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {/* Emergency Contact */}
            <div className="flex items-center p-3 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Emergency</h3>
                <p className="text-blue-600 font-bold">
                  {companyInfo?.emergencyPhone}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center p-3 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Working Hours</h3>
                <p className="text-gray-600">{companyInfo?.workingHours}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center p-3">
              <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Location</h3>
                <p className="text-gray-600">{companyInfo?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
