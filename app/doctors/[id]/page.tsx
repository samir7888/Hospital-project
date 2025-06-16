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
      doctor.specialization
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
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full flex flex-col md:flex-row gap-8 items-start mb-6">
                <div className="w-full md:w-1/3 lg:w-1/4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      width={600}
                      height={400}
                      src={
                        doctor?.profileImage?.url ||
                        "https://placehold.co/600x400.png"
                      }
                      alt={doctor.name}
                      className="w-full h-60 object-cover object-center"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 lg:w-3/4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {doctor.name}
                      </h1>
                      <p className="text-lg text-blue-600 font-medium mt-1 capitalize">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {doctor.experience && (
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{doctor.experience} Years Experience</span>
                      </div>
                    )}
                    {doctor.consulation && (
                      <div className="flex items-center">
                        <DollarSign className="text-blue-600 w-5 mr-2" />
                        <span>Consultation: {doctor.consulation}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-2" />
                        <Link
                          href={`mailto:${doctor.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {doctor.email}
                        </Link>
                      </div>
                    )}
                    {doctor.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-600 mr-2" />
                        <Link
                          href={`tel:${doctor.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {doctor.phone}
                        </Link>
                      </div>
                    )}
                  </div>

                  {doctor.address && (
                    <div className="flex items-center mt-7">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="capitalize">{doctor.address}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* right side */}
              <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Availability</h2>
                  <ul className="space-y-2">
                    {doctor.availability?.map((day, index) => (
                      <li key={index} className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="capitalize">{day}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Languages</h2>
                  <ul className="space-y-2">
                    {doctor.languagesKnown?.map((language, index) => (
                      <li key={index} className="flex items-center">
                        <Languages className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="capitalize">{language}</span>
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
          
          <div className=" flex flex-col md:flex-row rounded-lg shadow-md bg-white   justify-between gap-7 p-6 mb-6">
            <div>
             
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-gray-700 mb-6 uppercase">{doctor.degree}</p>

              {doctor.certifications.length > 0 && (
                <>
                  <h1 className="text-xl font-semibold mb-3 capitalize">
                    Certifications
                  </h1>
                  <ul className="list-disc list-inside text-gray-700 mb-6">
                    {doctor.certifications?.map((cert, index) => (
                      <li key={index} className="mb-2 flex items-start">
                        <Award className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="w-1/2 ">
              <SanitizeBody description={doctor.about} />
            </div>
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
