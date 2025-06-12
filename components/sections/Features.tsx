import React from "react";
import {
  Shield,
  Award,
  Clock,
  Users,
  ActivitySquare,
  HeartPulse,
} from "lucide-react";
import { serverFetch } from "@/lib/server-fetch";
import { FeatureResponse } from "@/app/types/feature-type";
import Image from "next/image";

const Features: React.FC = async () => {
  const features = await serverFetch<FeatureResponse>("features");
  if (!features || features?.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading features</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose GastroCare Hospital
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-xl text-gray-600">
              We are committed to providing exceptional healthcare with a focus
              on patient safety, comfort, and recovery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="h-full flex flex-col">
              {/* Feature Image */}
              <div className="h-48 overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  src={feature.image?.url || "https://placehold.co/400x300.png"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Feature Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Accredited Excellence in Healthcare
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-32 h-16 flex items-center justify-center">
                <p className="font-bold text-blue-800">JCI Accredited</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-32 h-16 flex items-center justify-center">
                <p className="font-bold text-blue-800">ISO Certified</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="w-32 h-16 flex items-center justify-center">
                <p className="font-bold text-blue-800">NABH Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
