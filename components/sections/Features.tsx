import React from "react";
import {
  Shield,
  Award,
  Clock,
  Users,
  ActivitySquare,
  HeartPulse,
} from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Advanced Technology",
      description:
        "State-of-the-art diagnostic and treatment equipment for accurate and efficient care.",
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: "Expert Specialists",
      description:
        "Highly qualified doctors with extensive training and experience in their fields.",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: "24/7 Emergency Care",
      description:
        "Round-the-clock emergency services with immediate response capabilities.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Patient-Centered Approach",
      description:
        "Personalized care plans focused on individual patient needs and preferences.",
    },
    {
      icon: <ActivitySquare className="h-10 w-10 text-blue-600" />,
      title: "Comprehensive Services",
      description:
        "Full range of medical services from preventive care to complex treatments.",
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-blue-600" />,
      title: "Compassionate Care",
      description:
        "Empathetic staff dedicated to providing comfort and support throughout treatment.",
    },
  ];

  return (
    <section id="features" className="py-32 bg-gray-50">
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
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-start">
                <div className="bg-blue-100 p-3 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
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
