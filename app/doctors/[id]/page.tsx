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
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  education: string;
  experience: number;
  image: string;
  availability: string[];
  languages: string[];
  certifications: string[];
  email?: string;
  phone?: string;
  bio?: string;
  address?: string;
  consultationFees?: string;
  ratings?: number;
  totalReviews?: number;
}

// This would typically come from your database or API
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    education: "MD, Harvard Medical School",
    experience: 15,
    image:
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Spanish"],
    certifications: [
      "American Board of Cardiology",
      "Advanced Cardiac Life Support",
    ],
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with 15 years of experience diagnosing and treating heart diseases. She specializes in interventional cardiology and heart failure management. Dr. Johnson is known for her patient-centered approach and expertise in complex cardiac procedures.",
    address: "Main Hospital Building, 3rd Floor, Room 302",
    consultationFees: "$250",
    ratings: 4.9,
    totalReviews: 127,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    education: "MD, Johns Hopkins University",
    experience: 12,
    image:
      "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Mandarin"],
    certifications: ["American Board of Neurology", "Neurological Surgery"],
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 234-5678",
    bio: "Dr. Michael Chen is a renowned neurologist specializing in movement disorders and neurodegenerative diseases. With 12 years of clinical experience, Dr. Chen has pioneered innovative treatment approaches for Parkinson's disease. He is dedicated to improving quality of life for patients with complex neurological conditions.",
    address: "Neuroscience Center, 2nd Floor, Suite 215",
    consultationFees: "$275",
    ratings: 4.8,
    totalReviews: 98,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    education: "MD, Stanford University",
    experience: 10,
    image:
      "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Tuesday", "Thursday"],
    languages: ["English", "Spanish"],
    certifications: [
      "American Board of Pediatrics",
      "Pediatric Advanced Life Support",
    ],
    email: "emily.rodriguez@hospital.com",
    phone: "+1 (555) 345-6789",
    bio: "Dr. Emily Rodriguez is a compassionate pediatrician with a decade of experience in child healthcare. She specializes in developmental pediatrics and adolescent medicine. Dr. Rodriguez creates a warm, friendly environment for her young patients and provides comprehensive care from infancy through adolescence.",
    address: "Children's Wing, 1st Floor, Room 110",
    consultationFees: "$200",
    ratings: 4.9,
    totalReviews: 156,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    education: "MD, Yale University",
    experience: 18,
    image:
      "https://images.pexels.com/photos/5207065/pexels-photo-5207065.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Wednesday", "Friday", "Saturday"],
    languages: ["English"],
    certifications: ["American Board of Orthopedic Surgery", "Sports Medicine"],
    email: "james.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    bio: "Dr. James Wilson is a highly experienced orthopedic surgeon with 18 years of practice. He specializes in joint replacement surgery and sports medicine. Dr. Wilson has worked with professional athletes and has developed minimally invasive techniques for faster recovery. He is committed to helping patients regain mobility and improve their quality of life.",
    address: "Orthopedic Center, 4th Floor, Suite 405",
    consultationFees: "$300",
    ratings: 4.7,
    totalReviews: 183,
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Dermatology",
    education: "MD, Columbia University",
    experience: 8,
    image:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "French"],
    certifications: ["American Board of Dermatology", "Cosmetic Dermatology"],
    email: "lisa.thompson@hospital.com",
    phone: "+1 (555) 567-8901",
    bio: "Dr. Lisa Thompson is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. With 8 years of experience, she treats a wide range of skin conditions and is known for her expertise in acne treatment and skin cancer detection. Dr. Thompson takes a holistic approach to skin health, focusing on both treatment and prevention.",
    address: "Dermatology Clinic, Ground Floor, Suite G12",
    consultationFees: "$225",
    ratings: 4.8,
    totalReviews: 112,
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Ophthalmology",
    education: "MD, UCLA",
    experience: 14,
    image:
      "https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Korean"],
    certifications: ["American Board of Ophthalmology", "Laser Surgery"],
    email: "robert.kim@hospital.com",
    phone: "+1 (555) 678-9012",
    bio: "Dr. Robert Kim is an experienced ophthalmologist with 14 years of practice in comprehensive eye care. He specializes in cataract surgery, glaucoma management, and refractive procedures. Dr. Kim has performed over 5,000 successful surgeries and is committed to preserving and improving his patients' vision through personalized treatment plans.",
    address: "Eye Center, 2nd Floor, Room 220",
    consultationFees: "$250",
    ratings: 4.9,
    totalReviews: 145,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const doctorId = parseInt(id);
  const doctor = doctorsData.find((doc) => doc.id === doctorId);

  if (!doctor)
    return {
      title: "Doctor Not Found",
      description: "The requested doctor profile does not exist.",
    };

  return {
    title: `${doctor.name} - Doctor Profile`,
    description: `Learn more about ${doctor.name}, a specialist in ${
      doctor.specialty
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
  const doctorId = parseInt(id);
  const doctor = doctorsData.find((doc) => doc.id === doctorId);

  if (!doctor) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-600">
          {rating} ({doctor.totalReviews} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <section className="container mx-auto">
        {/* Back button */}
        <div className="py-6">
          <Link
            href="/doctors"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Doctors
          </Link>
        </div>

        {/* Doctor Profile Header */}
        <div className="bg-white shadow">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full flex flex-col md:flex-row gap-8 items-start mb-6">
                <div className="w-full md:w-1/3 lg:w-1/4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-60 object-cover object-center "
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 lg:w-3/4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {doctor.name}
                      </h1>
                      <p className="text-lg text-blue-600 font-medium mt-1">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {doctor.ratings && (
                    <div className="mb-6">{renderStars(doctor.ratings)}</div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
                    {doctor.experience && (
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{doctor.experience} Years Experience</span>
                      </div>
                    )}
                    {doctor.consultationFees && (
                      <div className="flex items-center">
                        <DollarSign className="text-blue-600 w-5 mr-2" />
                        <span>Consultation: {doctor.consultationFees}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-2" />
                        <a
                          href={`mailto:${doctor.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {doctor.email}
                        </a>
                      </div>
                    )}
                    {doctor.phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-600 mr-2" />
                        <a
                          href={`tel:${doctor.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {doctor.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {doctor.address && (
                    <div className="flex items-center mt-7">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{doctor.address}</span>
                    </div>
                  )}

                  <div className="mt-4 md:mt-10">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Availability</h2>
                  <ul className="space-y-2">
                    {doctor.availability.map((day, index) => (
                      <li key={index} className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{day}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Languages</h2>
                  <ul className="space-y-2">
                    {doctor.languages.map((language, index) => (
                      <li key={index} className="flex items-center">
                        <Languages className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{language}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  About {doctor.name}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {doctor.bio || "No biography available for this doctor."}
                </p>

                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-gray-700 mb-6">{doctor.education}</p>

                <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  {doctor.certifications.map((cert, index) => (
                    <li key={index} className="mb-2 flex items-start">
                      <Award className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional sections could go here - patient reviews, publications, etc. */}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                    Book Appointment
                  </button>
                  <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-300">
                    Virtual Consultation
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return doctorsData.map((d) => ({
    id: String(d.id),
  }));
}
