import React from "react";
import { serverFetch } from "@/lib/server-fetch";
import { DoctorsResponse } from "../types/doctor-type";
import SearchInput from "@/components/searchInput";
import Link from "next/link";
import PaginationComponent from "@/components/PaginationComponent"; // Adjust path as needed
import { HomePageData } from "../types/heropage-type";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export type DoctorsPageProps = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await serverFetch<HomePageData>("doctors-page");

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

const Doctors = async (props: {
  searchParams: Promise<DoctorsPageProps["searchParams"]>;
}) => {
  const searchParams = await props.searchParams;
  const queryParams = new URLSearchParams(searchParams);
  const queryString = queryParams.toString();
  const doctorHomePageData = await serverFetch<HomePageData>("doctors-page");
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div
        className={cn(
          "relative  text-white py-20",
          !doctorHomePageData?.heroSection.image?.url && "bg-blue-900"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {doctorHomePageData?.heroSection?.title || "Our Medical Team"}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {doctorHomePageData?.heroSection?.subtitle ||
              "Meet our team of experienced healthcare professionals dedicated to providing exceptional care and treatment."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col  sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
            {doctorHomePageData?.heroSection.cta.map((cta, index) => (
              <Link key={index} href={cta.link}>
                <Button
                  variant={cta.variant}
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-full transition-colors duration-300 cursor-pointer"
                >
                  {cta.text}
                </Button>
              </Link>
            ))}
          </div>

          {/* bg-image */}

          {doctorHomePageData?.heroSection.image?.url && (
            <div
              className="absolute inset-0 bg-center bg-cover -z-30"
              style={{
                backgroundImage: `url(${doctorHomePageData?.heroSection.image?.url})`,
                backgroundPosition: "center 25%",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <DoctorsGrid queryString={queryString} />
    </div>
  );
};

export default Doctors;

async function DoctorsGrid({ queryString }: { queryString: string }) {
  const url = `doctors${queryString ? `?${queryString}` : ""}`;
  const filteredDoctors = await serverFetch<DoctorsResponse>(url);

  if (!filteredDoctors || filteredDoctors?.data?.length === 0) {
    return (
      <div className="text-center flex flex-col justify-center items-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No doctors found</h3>
        {queryString.includes("search=") && (
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.data.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <Image
                  width={600}
                  height={400}
                  src={doctor?.profileImage?.url || "https://placehold.co/600x400.png"}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium capitalize">
                  {Array.isArray(doctor.specializations)
                    ? doctor.specializations.join(", "):
                      doctor.specializations}
                </p>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p className="uppercase">{doctor.degree}</p>
                  <p>{doctor.experience} Years Experience</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">Available on:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.availability.map((day, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded capitalize text-sm"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">Languages:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.languagesKnown.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 capitalize bg-gray-100 text-gray-800 rounded text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <Link href={`doctors/${doctor.id}`}>
                    <button className="group flex text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors duration-300">
                      View Profile 
                      <ChevronRight className="group-hover:transform group-hover:translate-x-3 duration-500" />
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        {filteredDoctors.meta && (
          <div className="mt-8">
            <PaginationComponent meta={filteredDoctors.meta} />
          </div>
        )}
      </div>
    </div>
  );
}
