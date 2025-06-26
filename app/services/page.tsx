import React from "react";
import { HomePageData } from "../types/heropage-type";
import { serverFetch } from "@/lib/server-fetch";
import { ServicesResponse } from "../types/services-type";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PaginationComponent from "@/components/PaginationComponent";

export type ServicesPageProps = {
  searchParams: {
    page?: string;
  };
};
export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await serverFetch<HomePageData>("services-page");

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
const Services = async (props: {
  searchParams: Promise<ServicesPageProps["searchParams"]>;
}) => {
  const pageParam = await props.searchParams;
  const queryParams = new URLSearchParams({
    ...pageParam,
    take: "20",
  });
  const queryString = queryParams.toString();
  const url = `services${queryString ? `?${queryString}` : ""}`;
  try {
    const [servicesResult, servicesDataResult] = await Promise.allSettled([
      serverFetch<HomePageData>("services-page"),
      serverFetch<ServicesResponse>(url),
    ]);

    const services =
      servicesResult.status === "fulfilled" ? servicesResult.value : null;
    const servicesResponse =
      servicesDataResult.status === "fulfilled"
        ? servicesDataResult.value
        : null;

    const servicesData = servicesResponse?.data || [];
    const hasServices = servicesData.length > 0;

    return (
      <div className="pt-20 relative">
        {/* Hero Section */}
        <div
          className={cn(
            "relative   py-20",
            !services?.heroSection.image?.url && "bg-blue-900"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl text-white md:text-5xl font-bold mb-6">
              {services?.heroSection?.title || "Our Medical Services"}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {services?.heroSection?.subtitle ||
                "Comprehensive healthcare services delivered by expert professionals using state-of-the-art technology."}
            </p>

            {/* Buttons */}
            <div className="mt-8  flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-delay-2">
              {services?.heroSection.cta.map((cta, index) => (
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

          {/* bg-image */}

          {services?.heroSection.image?.url && (
            <div
              className="absolute inset-0 bg-center bg-cover -z-30"
              style={{
                backgroundImage: `url(${services?.heroSection.image?.url})`,
                backgroundPosition: "center 25%",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
            </div>
          )}
        </div>

        {/* Services Grid or No Services Message */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {hasServices ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      {service.coverImage && (
                        <Image
                          width={600}
                          height={400}
                          src={
                            service.coverImage.url ||
                            "https://placehold.co/600x400.png"
                          }
                          alt={service.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.summary}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      Created:{" "}
                      {new Date(service.createdAt).toLocaleDateString()}
                    </div>
                    <Link
                      href={`/services/${service.id}`}
                      className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    No Services Available
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We're currently updating our services. Please check back
                    later or contact us for more information.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}

            {/* Pagination Component */}
            {servicesResponse?.meta && (
              <div className="mt-8">
                <PaginationComponent meta={servicesResponse.meta} />
              </div>
            )}
          </div>
        </div>

        {/* CTA Section - Only show if services exist */}
        {hasServices && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Need Medical Assistance?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our team of medical professionals is here to help you 24/7.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/#appointment"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    Book an Appointment
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching services data:", error);

    // Show error state
    return (
      <div className="pt-20 relative">
        {/* Hero Section */}
        <div className="bg-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Medical Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Comprehensive healthcare services delivered by expert
              professionals using state-of-the-art technology.
            </p>
          </div>
        </div>

        {/* Error State */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Unable to Load Services
                </h3>
                <p className="text-gray-600 mb-8">
                  We're experiencing technical difficulties. Please try again
                  later or contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Services;
