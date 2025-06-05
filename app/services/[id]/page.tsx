import { ServicesResponse, SingleServices } from "@/app/types/services-type";
import SanitizeBody from "@/components/html-sanitize";
import Hero from "@/components/sections/Hero";
import { serverFetch } from "@/lib/server-fetch";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const service = await serverFetch<SingleServices>(`services/${id}`);

    if (!service) {
      return {
        title: "Service Not Found",
        description: "The requested service profile does not exist.",
      };
    }

    return {
      title: `${service.title} - Hospital Service`,
      description: `Learn more about ${service.summary}`,
    };
  } catch (error) {
    return {
      title: "Service Not Found",
      description: "The requested service profile does not exist.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const services = await serverFetch<ServicesResponse>("services");

    if (!services || !services.data) {
      return [];
    }

    return services.data.map((service) => ({
      id: service.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ServiceProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // Remove the leading slash - it should be consistent with your API endpoint
    const service = await serverFetch<SingleServices>(`services/${id}`);

    if (!service) {
      return <NotFound />;
    }

    return (
      <div className="py-12 ">
        <div className="bg-blue-900 px-2 text-white py-20">
          <div className="max-w-7xl mx-auto ">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service?.title || "Our Medical Services"}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              {service?.summary ||
                "Comprehensive healthcare services delivered by expert professionals using state-of-the-art technology."}
            </p>
          </div>
        </div>
        <div className="relative px-2 max-w-7xl mx-auto  py-12  ">
          <SanitizeBody
            description={
              service?.description ||
              "No additional details available for this service."
            }
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching doctor:", error);
    notFound();
  }
}

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Service Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The service you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/services"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Back to Services
        </Link>
      </div>
    </div>
  );
}
