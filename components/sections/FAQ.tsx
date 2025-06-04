'use client';

import React, { useState } from "react";
import { Search, HelpCircle, Phone, Mail, Clock } from "lucide-react";
import { FaqResponse, FaqItem } from "@/app/types/faqs-type";
import { EFaqType } from "@/app/types/enums";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SanitizeBody from "../html-sanitize";

interface FAQClientProps {
  faqData: FaqResponse;
}

export const FAQClient: React.FC<FAQClientProps> = ({ faqData }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // All categories for the filter with icons
  const categories = [
    { id: "all", name: "All Questions", icon: "📋" },
    { id: EFaqType.General, name: "General", icon: "ℹ️" },
    { id: EFaqType.Doctor, name: "Doctor", icon: "👨‍⚕️" },
    { id: EFaqType.Patient, name: "Patient", icon: "🏥" },
    { id: EFaqType.Insurance, name: "Insurance", icon: "🛡️" },
    { id: EFaqType.Billing, name: "Billing", icon: "💳" },
    { id: EFaqType.Facility, name: "Facility", icon: "🏢" },
    { id: EFaqType.EmergencyCare, name: "Emergency Care", icon: "🚨" },
  ];

  // Filter FAQs based on active category
  const filteredFaqs = activeCategory === "all" 
    ? faqData.data 
    : faqData.data.filter(faq => faq.category === activeCategory);

  // Get available categories (only show tabs for categories that have FAQs)
  const availableCategories = categories.filter(category => {
    if (category.id === "all") return true;
    return faqData.data.some(faq => faq.category === category.id);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Find answers to commonly asked questions about our services, policies, and procedures. 
              We're here to help make your experience seamless.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🔍</span>
              Browse by Category
            </h3>
            <div className="overflow-x-auto">
              <nav className="flex space-x-2" aria-label="Tabs">
                {availableCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group flex items-center px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 transform hover:scale-105 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                    <span className={`ml-3 inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold leading-none rounded-full transition-colors ${
                      activeCategory === category.id
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                    }`}>
                      {category.id === "all" 
                        ? faqData.data.length 
                        : faqData.data.filter(faq => faq.category === category.id).length
                      }
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-5xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3 text-2xl">
                    {availableCategories.find(cat => cat.id === activeCategory)?.icon || "📋"}
                  </span>
                  {availableCategories.find(cat => cat.id === activeCategory)?.name} 
                  <span className="ml-3 text-sm font-normal text-gray-600">
                    ({filteredFaqs.length} questions)
                  </span>
                </h3>
              </div>
              
              <div className="p-6">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id} 
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <AccordionTrigger className="text-left hover:no-underline transition-all duration-200 px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 group">
                        <div className="flex items-start space-x-4 w-full">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight">
                              {faq.title}
                            </h4>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="mx-auto p-3 prose prose-lg max-w-none">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                            <SanitizeBody description={faq.description} />
                            {/* <p className="text-gray-700 leading-relaxed text-base">
                              {faq.description}
                            </p> */}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-500 mb-6">
                No questions found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📋</span>
                View all questions
              </button>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-16 mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
              <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center">
                <span className="mr-3 text-3xl">💬</span>
                Still have questions?
              </h3>
              <p className="text-blue-100 text-center mt-2 text-lg">
                Our patient support team is available to help you with any questions not answered here.
              </p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-200">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 text-center mb-3">Call Us</h4>
                  <div className="flex items-center justify-center text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Monday to Friday, 8am - 6pm</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 text-center">
                    (555) 123-4567
                  </p>
                </div>
                
                <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 text-center mb-3">Email Us</h4>
                  <div className="flex items-center justify-center text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>We'll respond within 24 hours</span>
                  </div>
                  <p className="text-lg font-bold text-indigo-600 text-center break-all">
                    support@medcarehospital.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};