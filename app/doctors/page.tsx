"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    education: "MD, Harvard Medical School",
    experience: 15,
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Spanish"],
    certifications: ["American Board of Cardiology", "Advanced Cardiac Life Support"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    education: "MD, Johns Hopkins University",
    experience: 12,
    image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Mandarin"],
    certifications: ["American Board of Neurology", "Neurological Surgery"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    education: "MD, Stanford University",
    experience: 10,
    image: "https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Tuesday", "Thursday"],
    languages: ["English", "Spanish"],
    certifications: ["American Board of Pediatrics", "Pediatric Advanced Life Support"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    education: "MD, Yale University",
    experience: 18,
    image: "https://images.pexels.com/photos/5207065/pexels-photo-5207065.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Wednesday", "Friday", "Saturday"],
    languages: ["English"],
    certifications: ["American Board of Orthopedic Surgery", "Sports Medicine"]
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Dermatology",
    education: "MD, Columbia University",
    experience: 8,
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "French"],
    certifications: ["American Board of Dermatology", "Cosmetic Dermatology"]
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Ophthalmology",
    education: "MD, UCLA",
    experience: 14,
    image: "https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=600",
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Korean"],
    certifications: ["American Board of Ophthalmology", "Laser Surgery"]
  }
];

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = Array.from(new Set(doctorsData.map(doctor => doctor.specialty)));

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Medical Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Meet our team of experienced healthcare professionals dedicated to providing 
            exceptional care and treatment.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <div className="mt-4 space-y-2 text-gray-600">
                    <p>{doctor.education}</p>
                    <p>{doctor.experience} Years Experience</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900">Available on:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctor.availability.map((day, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900">Languages:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {doctor.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;