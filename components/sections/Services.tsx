import React from "react";

import Link from "next/link";
import { ServicesResponse } from "@/app/types/services-type";
import { serverFetch } from "@/lib/server-fetch";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const Services: React.FC = async () => {
  const ServicesResponse = await serverFetch<ServicesResponse>("services");

  if (!ServicesResponse || ServicesResponse?.data?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading services</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
  const servicesData = ServicesResponse.data;

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of medical services to address
            diverse healthcare needs with excellence and compassion.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2  ${
            servicesData.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-8`}
        >
          {servicesData.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <div
                key={service.id}
                className="group bg-white overflow-hidden p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 w-full h-48 rounded-2xl bg-blue-50  relative">
                    <Image
                      fill
                      src={service.coverImage?.url}
                      alt={service.title}
                      className=" absolute rounded-2xl group-hover:scale-110 transition-transform duration-400"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-4">
                    {service.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="services"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
