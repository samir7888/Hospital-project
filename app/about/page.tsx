import React from "react";
import { Building, Users, Trophy, Globe } from "lucide-react";
import FAQ from "@/components/sections/ServerFaqs";
import { AboutPageData } from "../types/aboutpage-type";
import { serverFetch } from "@/lib/server-fetch";
import SanitizeBody from "@/components/html-sanitize";

const iconMap = [Users, Building, Trophy, Globe];

const About: React.FC = async () => {
  const aboutData = await serverFetch<AboutPageData>("about-page");

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {aboutData?.heroSection?.title || "About GastroCare Hospital"}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {aboutData?.heroSection?.subtitle ||
              "Leading the way in medical excellence, innovation, and patient care since 1988."}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutData?.statistics?.map((stat, index) => {
              const Icon = iconMap[index % iconMap.length];
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.count}
                  </div>
                  <div className="text-gray-600">{stat.title}</div>
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
            {aboutData?.journey?.map((step, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData?.coreValues?.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default About;
