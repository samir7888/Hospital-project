import { DoctorsResponse } from "@/app/types/doctor-type";
import { serverFetch } from "@/lib/server-fetch";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Specialists: React.FC = async () => {
  const DoctorsResponse = await serverFetch<DoctorsResponse>("doctors");

  if (!DoctorsResponse || DoctorsResponse?.data?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading doctors</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
  const doctorsData = DoctorsResponse.data;
  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Specialists
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced medical professionals dedicated to
            providing the highest quality healthcare.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2  ${
            doctorsData.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-8`}
        >
          {doctorsData.map((doctor) => (
            <Link key={doctor.id} href={`doctors/${doctor.id}`}>
              <div
                key={doctor.id}
                className="relative group aspect-square bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  fill
                  quality={100}
                  priority={true}
                  src={
                    doctor.profileImage?.url ||
                    "https://placehold.co/600x400.png"
                  }
                  alt={doctor.name}
                  className=" absolute top-0  object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute left-0 right-0  px-6 py-3 bottom-0">
                  <div className="h-8 group-hover:h-20 duration-500">
                    <h3 className="text-xl font-semibold text-yellow-500 capitalize">
                      {doctor.name}
                    </h3>
                    <p className="opacity-0 invisible group-hover:opacity-100 flex-col group-hover:visible  text-gray-200 text-medium duration-300">
                      <span className=" block ">{doctor.degree}</span>
                      {doctor.experience} Years Experience
                    </p>
                  </div>
                  <p className="text-base capitalize text-white transition-all">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="doctors"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Specialists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Specialists;
