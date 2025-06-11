import React from "react";
import { Building, Users, Trophy, Globe } from "lucide-react";
import FAQ from "@/components/sections/ServerFaqs";
import { AboutPageData } from "../types/aboutpage-type";
import { serverFetch } from "@/lib/server-fetch";
import SanitizeBody from "@/components/html-sanitize";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const iconMap = [Users, Building, Trophy, Globe];

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await serverFetch<AboutPageData>("about-page");

  return {
    title: aboutData?.metadata?.title || "About GastroCare Hospital",
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

const About: React.FC = async () => {
  const aboutData = await serverFetch<AboutPageData>("about-page");
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div
        className={cn(
          "relative  text-white py-20",
          !aboutData?.heroSection.image?.url && "bg-blue-900"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 capitalize">
            {aboutData?.heroSection?.title || "About GastroCare Hospital"}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl capitalize">
            {aboutData?.heroSection?.subtitle ||
              "Leading the way in medical excellence, innovation, and patient care since 1988."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col  sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
            {aboutData?.heroSection.cta.map((cta, index) => (
              <Link key={index} href={cta.link}>
                <Button
                  variant={cta.variant}
                  className="inline-flex capitalize items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-full transition-colors duration-300 cursor-pointer"
                >
                  {cta.text}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {aboutData?.heroSection.image?.url && (
          <div
            className="absolute inset-0 bg-center bg-cover -z-30"
            style={{
              backgroundImage: `url(${aboutData?.heroSection.image?.url})`,
              backgroundPosition: "center 25%",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-24 flex-wrap">
            {aboutData?.statistics?.map((stat, index) => {
              const Icon = iconMap[index % iconMap.length];
              return (
                <div key={index} className="text-center flex-col">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.count}
                  </div>
                  <div className="text-gray-600 capitalize font-semibold">{stat.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="whitespace-normal break-words">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="prose max-w-none">
                <SanitizeBody
                  description={
                    aboutData?.mission ||
                    "To provide exceptional healthcare services that improve the quality of life for our patients and community."
                  }
                />
              </div>
            </div>
            <div className="whitespace-normal break-words">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <div className="prose max-w-none">
                <SanitizeBody
                  description={
                    aboutData?.vision ||
                    "To be the leading healthcare provider, recognized for our commitment to excellence, innovation, and compassionate patient care."
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Journey
          </h2>
          <div className="space-y-12">
            {aboutData?.journey && aboutData?.journey?.length > 0 ? (
              aboutData?.journey?.map((step, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center">No Journey Found</div>
            )}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="flex justify-center gap-24 flex-wrap">
            {aboutData?.coreValues && aboutData?.coreValues?.length > 0 ? (
              aboutData?.coreValues?.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))
            ) : (
              <div>No Core Values Found</div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default About;
