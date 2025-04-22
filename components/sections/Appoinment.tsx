"use client";
import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  department: string;
  message: string;
}

const Appointment: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    department: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log(formData);
    // Show success message
    setIsSubmitted(true);
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        department: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="appointment" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Left Column - Image and Info */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Book an Appointment</h2>
              <p className="mt-4 text-xl text-gray-600">
                Schedule your visit with our specialists and receive the care you deserve.
              </p>
            </div>
            
            <div className="bg-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Why Book Online?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Quick and easy scheduling</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>No waiting on hold</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>24/7 booking availability</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Automatic confirmation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Easy rescheduling if needed</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-500 rounded-lg">
                <p className="font-medium">Need urgent care?</p>
                <p className="mt-1">Call our 24/7 emergency line:</p>
                <p className="text-xl font-bold mt-1">(123) 456-7890</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-900 mt-4">Appointment Request Submitted!</h3>
                  <p className="text-gray-600 mt-2">
                    Thank you for choosing MedCare Hospital. We'll contact you shortly to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time *</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department/Specialty *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="gynecology">Gynecology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="general">General Medicine</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Please share any symptoms or concerns..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                      Book Appointment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;