import React from 'react';

import { Stethoscope, Scissors, TestTube, Baby, Shield, Activity } from 'lucide-react';
import { servicesData } from '@/data/services';

const Services: React.FC = () => {
  // Map icon names to actual Lucide React components
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'stethoscope': return <Stethoscope className="h-12 w-12 text-blue-600" />;
      case 'scissors': return <Scissors className="h-12 w-12 text-blue-600" />;
      case 'test-tube': return <TestTube className="h-12 w-12 text-blue-600" />;
      case 'baby': return <Baby className="h-12 w-12 text-blue-600" />;
      case 'shield': return <Shield className="h-12 w-12 text-blue-600" />;
      case 'activity': return <Activity className="h-12 w-12 text-blue-600" />;
      default: return <Stethoscope className="h-12 w-12 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of medical services to address diverse healthcare needs with excellence and compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-blue-50 p-4 rounded-full">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <a 
                  href="#" 
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;