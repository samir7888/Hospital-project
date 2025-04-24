"use client";
import React from "react";
import { Building, Users, Trophy, Globe } from "lucide-react";
import FAQ from "@/components/sections/FAQ";

const About: React.FC = () => {
  const stats = [
    {
      icon: <Building className="h-8 w-8 text-blue-600" />,
      number: "35+",
      label: "Years of Excellence",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: "50,000+",
      label: "Patients Annually",
    },
    {
      icon: <Trophy className="h-8 w-8 text-blue-600" />,
      number: "200+",
      label: "Award-Winning Doctors",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      number: "24/7",
      label: "Emergency Care",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About GastroCare Hospital
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Leading the way in medical excellence, innovation, and patient care
            since 1988.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional healthcare services that improve the
                quality of life for our patients and community. We are committed
                to delivering compassionate, patient-centered care using the
                latest medical technologies and evidence-based practices.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To be the region's most trusted healthcare provider, recognized
                for clinical excellence, innovative treatments, and outstanding
                patient outcomes. We strive to create a healthier community
                through comprehensive care and education.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Journey
          </h2>
          <div className="space-y-12">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1988 - Foundation
              </h3>
              <p className="text-gray-600">
                Established as a small community hospital with a vision to
                provide quality healthcare services.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1995 - Major Expansion
              </h3>
              <p className="text-gray-600">
                Expanded facilities to include specialized departments and
                state-of-the-art equipment.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2005 - Research Center
              </h3>
              <p className="text-gray-600">
                Opened our dedicated research center focusing on innovative
                medical treatments.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2015 - Digital Transformation
              </h3>
              <p className="text-gray-600">
                Implemented advanced digital health systems and telemedicine
                capabilities.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2025 - Future Vision
              </h3>
              <p className="text-gray-600">
                Continuing to expand our services and embrace cutting-edge
                medical technologies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of patient care,
                maintaining the highest standards of medical practice and
                professional conduct.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compassion
              </h3>
              <p className="text-gray-600">
                We treat each patient with kindness, empathy, and respect,
                understanding their unique needs and concerns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace advanced medical technologies and innovative
                treatments to provide the best possible care for our patients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* faq section */}
      <FAQ />
    </div>
  );
};

export default About;
