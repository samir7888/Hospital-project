import { doctorsData } from '@/data/doctors';
import Link from 'next/link';
import React from 'react';

const Specialists: React.FC = () => {
  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Specialists</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced medical professionals dedicated to providing the highest quality healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doctor) => (
            <div 
              key={doctor.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>{doctor.education}</p>
                  <p className="mt-1">{doctor.experience} Years Experience</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link 
                    href={`doctors/${doctor.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    View Profile
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="doctors" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All Specialists
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Specialists;