import React from 'react';
import { Heart, Brain, Baby, Bone, Eye, Bluetooth as Tooth, Stethoscope, FlaskRound as Flask, Activity, Scissors } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Heart className="h-12 w-12 text-blue-600" />,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, treatment, and rehabilitation for cardiac conditions.",
      treatments: ["Cardiac Surgery", "Angioplasty", "Pacemaker Implementation", "Heart Disease Management"]
    },
    {
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      title: "Neurology",
      description: "Expert care for disorders of the nervous system, brain, and spine.",
      treatments: ["Brain Surgery", "Stroke Treatment", "Epilepsy Management", "Neurological Rehabilitation"]
    },
    {
      icon: <Baby className="h-12 w-12 text-blue-600" />,
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents.",
      treatments: ["Vaccination", "Growth Monitoring", "Pediatric Surgery", "Development Assessment"]
    },
    {
      icon: <Bone className="h-12 w-12 text-blue-600" />,
      title: "Orthopedics",
      description: "Treatment for bone, joint, and muscle conditions.",
      treatments: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Spine Surgery"]
    },
    {
      icon: <Eye className="h-12 w-12 text-blue-600" />,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to complex surgeries.",
      treatments: ["Cataract Surgery", "LASIK", "Glaucoma Treatment", "Retinal Disorders"]
    },
    {
      icon: <Tooth className="h-12 w-12 text-blue-600" />,
      title: "Dental Care",
      description: "Comprehensive dental services for all ages.",
      treatments: ["Dental Surgery", "Orthodontics", "Periodontics", "Cosmetic Dentistry"]
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-blue-600" />,
      title: "Internal Medicine",
      description: "Diagnosis and treatment of adult diseases and conditions.",
      treatments: ["Preventive Care", "Chronic Disease Management", "Health Screenings", "Wellness Programs"]
    },
    {
      icon: <Flask className="h-12 w-12 text-blue-600" />,
      title: "Laboratory Services",
      description: "Advanced diagnostic testing and analysis.",
      treatments: ["Blood Tests", "Pathology", "Microbiology", "Genetic Testing"]
    },
    {
      icon: <Activity className="h-12 w-12 text-blue-600" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services with rapid response.",
      treatments: ["Trauma Care", "Critical Care", "Emergency Surgery", "Acute Care"]
    },
    {
      icon: <Scissors className="h-12 w-12 text-blue-600" />,
      title: "Surgery",
      description: "State-of-the-art surgical procedures across multiple specialties.",
      treatments: ["Minimally Invasive Surgery", "Robotic Surgery", "General Surgery", "Plastic Surgery"]
    }
  ];

  return (
    <div className="pt-20 relative"> 
     
      {/* Hero Section */}
      <div className="bg-blue-900  text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Medical Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive healthcare services delivered by expert professionals using 
            state-of-the-art technology.
          </p>
        </div>
       
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.treatments.map((treatment, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Medical Assistance?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team of medical professionals is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/#appointment" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                Book an Appointment
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;