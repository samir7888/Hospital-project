import { ServicesResponse, SingleServices } from "@/app/types/services-type";
import SanitizeBody from "@/components/html-sanitize";
import { serverFetch } from "@/lib/server-fetch";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
}

export async function generateStaticParams() {
  const services = await serverFetch<ServicesResponse>("services");

  if (!services || !services.data) {
    return [];
  }

  return services.data.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await serverFetch<SingleServices>(`services/${id}`);

  if (!service) notFound();

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
      <div className="bg-gray-50 py-6">
        <Image
          width={1000}
          height={400}
          src={service?.coverImage?.url || "https://placehold.co/1200x400.png"}
          alt={service?.title || "Service Cover Image"}
          className="max-w-[460px] mx-auto h-auto object-cover rounded-lg mb-4"
        />
      </div>
      <div className="relative px-5 max-w-7xl mx-auto  py-12  ">
        <SanitizeBody
          description={
            service?.description ||
            "No additional details available for this service."
          }
        />
      </div>
    </div>
  );
}
