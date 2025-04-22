"use client";
import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MedCare Hospital</h3>
            <p className="text-blue-100 mb-4">
              Providing exceptional healthcare services since 1985. Our mission is to enhance the health and well-being of the communities we serve.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-blue-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-blue-100 hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#doctors" className="text-blue-100 hover:text-white transition-colors">Our Doctors</a></li>
              <li><a href="#appointment" className="text-blue-100 hover:text-white transition-colors">Book Appointment</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Patient Portal</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-300 mt-0.5" />
                <span>123 Medical Center Drive<br />Anytown, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-300" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-300" />
                <span>info@medcarehospital.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hours of Operation</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-blue-300 mt-0.5" />
                <div>
                  <p className="font-semibold">Emergency Care</p>
                  <p>24 hours / 7 days a week</p>
                </div>
              </li>
              <li className="mt-3">
                <p className="font-semibold">Outpatient Services</p>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 12:00 PM</p>
                <p>Sunday: Closed</p>
              </li>
              <li className="mt-3">
                <p className="font-semibold">Visiting Hours</p>
                <p>Daily: 10:00 AM - 8:00 PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200">&copy; {new Date().getFullYear()} MedCare Hospital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;