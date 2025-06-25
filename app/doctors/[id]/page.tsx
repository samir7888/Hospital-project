import React from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Languages,
  Award,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serverFetch } from "@/lib/server-fetch";
import { Doctor, DoctorsResponse } from "@/app/types/doctor-type";
import SanitizeBody from "@/components/html-sanitize";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const doctor = await serverFetch<Doctor>(`doctors/${id}`);

  if (!doctor) {
    return {
      title: "Doctor Not Found",
      description: "The requested doctor profile does not exist.",
    };
  }

  return {
    title: `${doctor.name} - Doctor Profile`,
    description: `Learn more about ${doctor.name}, a specialist in ${
      doctor.specializations.join(", ")
    } with ${doctor.experience} years of experience. Contact: ${
      doctor.email || doctor.phone
    }`,
  };
}

export default async function DoctorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Remove the leading slash - it should be consistent with your API endpoint
  const doctor = await serverFetch<Doctor>(`doctors/${id}`);

  if (!doctor) notFound();

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <section className="container mx-auto">
        {/* Back button */}
        <div className="py-6"></div>

        {/* Doctor Profile Header */}
        <div className="bg-white shadow">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full flex flex-col gap-8 items-start mb-6">
                <div className="flex flex-col lg:flex-row gap-8 items-start mb-6 w-full">
                  {/* Image Section - Fixed width */}
                  <div className="w-1/2 xl:w-2/5">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <Image
                        width={800}
                        height={400}
                        src={
                          doctor?.profileImage?.url ||
                          "https://placehold.co/600x400.png"
                        }
                        alt={doctor.name}
                        className="w-full h-60 sm:h-72 lg:h-80 object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Doctor Info Section */}
                  <div className="w-full lg:w-1/2 xl:w-3/5">
                    {/* Header Section */}
                    <div className="mb-6">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {doctor.name}
                      </h1>
                      <div className="flex items-center mt-2">
                        <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                        <p className="text-lg sm:text-xl text-blue-600 font-semibold capitalize">
                          {doctor.specializations.join(', ')}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {/* Experience Card */}
                      {doctor.experience && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className=" text-gray-500 font-medium uppercase tracking-wide">
                                Experience
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                {doctor.experience} Years
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Location Card */}
                      {doctor.address && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                            <div>
                              <p className=" text-gray-500 font-medium uppercase tracking-wide">
                                Location
                              </p>
                              <p className="text-lg font-semibold text-gray-900 capitalize leading-tight">
                                {doctor.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contact Information */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="w-1 h-5 bg-gray-600 rounded-full mr-3"></div>
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        {doctor.email && (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className=" text-gray-500 font-medium uppercase tracking-wide">
                                Email
                              </p>
                              <Link
                                href={`mailto:${doctor.email}`}
                                className="text-blue-600 hover:text-blue-700 font-medium text-base hover:underline transition-colors"
                              >
                                {doctor.email}
                              </Link>
                            </div>
                          </div>
                        )}
                        {doctor.phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-blue-600 mr-3" />
                            <div>
                              <p className=" text-gray-500 font-medium uppercase tracking-wide">
                                Phone
                              </p>
                              <Link
                                href={`tel:${doctor.phone}`}
                                className="text-blue-600 hover:text-blue-700 font-medium text-base hover:underline transition-colors"
                              >
                                {doctor.phone}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-3">Education</h3>
                  <p className="text-gray-700 mb-6 uppercase text-sm sm:text-base">
                    {doctor.degree}
                  </p>

                  {doctor.certifications.length > 0 && (
                    <>
                      <h1 className="text-xl font-semibold mb-3 capitalize">
                        Certifications
                      </h1>
                      <ul className="list-none text-gray-700 mb-6">
                        {doctor.certifications?.map((cert, index) => (
                          <li key={index} className="mb-2 flex items-start">
                            <Award className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Availability
                  </h2>
                  <ul className="space-y-2">
                    {doctor.availability?.map((day, index) => (
                      <li key={index} className="flex items-center">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="capitalize text-sm sm:text-base">
                          {day}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Languages
                  </h2>
                  <ul className="space-y-2">
                    {doctor.languagesKnown?.map((language, index) => (
                      <li key={index} className="flex items-center">
                        <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="capitalize text-sm sm:text-base">
                          {language}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="py-12">
          <div className="w-full   rounded-lg shadow-md bg-white p-6 mb-6">
            <SanitizeBody description={doctor.about} />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const doctors = await serverFetch<DoctorsResponse>(`doctors`);

  if (!doctors || !doctors.data) {
    return [];
  }

  return doctors.data.map((doctor) => ({
    id: doctor.id,
  }));
}
