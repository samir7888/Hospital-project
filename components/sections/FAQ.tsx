"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // FAQ data grouped by categories
  const faqData = {
    admissions: [
      {
        id: 1,
        question: "What should I bring for hospital admission?",
        answer:
          "Please bring your government-issued ID, insurance card, list of current medications, advance directives (if applicable), and personal care items. Leave valuables at home. For planned admissions, follow any pre-admission instructions provided by your doctor.",
      },
      {
        id: 2,
        question:
          "How do I pre-register for an upcoming appointment or procedure?",
        answer:
          "You can pre-register online through our patient portal, by phone at (555) 123-4567, or in person at our admissions office. Pre-registration is recommended at least 48 hours before your scheduled appointment to reduce wait times.",
      },
      {
        id: 3,
        question: "Do I need a referral to see a specialist?",
        answer:
          "This depends on your insurance plan. Many insurance providers require a referral from your primary care physician before seeing a specialist. We recommend checking with your insurance provider regarding their referral requirements before scheduling an appointment with a specialist.",
      },
    ],
    insurance: [
      {
        id: 4,
        question: "What insurance plans do you accept?",
        answer:
          "GastroCare Hospital accepts most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Humana. For specific questions about your insurance coverage, please contact our billing department at (555) 123-4570.",
      },
      {
        id: 5,
        question: "What if I don't have insurance?",
        answer:
          "We offer financial assistance programs for uninsured and underinsured patients. Our financial counselors can help determine eligibility for various programs and develop payment plans. Please contact our financial services office at (555) 123-4575 to discuss your options.",
      },
    ],
    visitation: [
      {
        id: 6,
        question: "What are the visiting hours?",
        answer:
          "General visiting hours are from 9:00 AM to 8:00 PM daily. Specialized units like ICU, pediatrics, and maternity may have different visiting policies. Please check with the specific department or nursing station for their current visiting guidelines.",
      },
      {
        id: 7,
        question: "How many visitors can a patient have at once?",
        answer:
          "We generally allow two visitors per patient at a time. In special circumstances, exceptions may be made at the discretion of the nursing staff. For the ICU and other specialized care units, visitation may be more limited.",
      },
    ],
    medical: [
      {
        id: 8,
        question: "How do I access my medical records?",
        answer:
          "You can access your medical records through our secure patient portal. For records not available online or if you prefer paper copies, submit a medical records request form to our Health Information Management department. Please allow 7-10 business days for processing.",
      },
      {
        id: 9,
        question: "How do I refill my prescription?",
        answer:
          "The easiest way to refill prescriptions is through your pharmacy. They will contact your doctor if necessary. You can also request refills through our patient portal or by calling your doctor's office directly at least 3 business days before you need the refill.",
      },
    ],
    facilities: [
      {
        id: 10,
        question: "Where can I park when visiting the hospital?",
        answer:
          "We offer both self-parking in our main garage and valet parking at the main entrance. Parking fees apply, with discounted weekly passes available for frequent visitors. Handicap parking spaces are located near all entrances.",
      },
      {
        id: 11,
        question: "Is there a cafeteria or food options in the hospital?",
        answer:
          "Yes, our main cafeteria is located on the first floor and is open from 6:30 AM to 8:00 PM. We also have a coffee shop in the main lobby (open 7:00 AM to 7:00 PM) and vending machines throughout the facility. Visitors are welcome at all dining locations.",
      },
    ],
    emergency: [
      {
        id: 12,
        question: "When should I go to the Emergency Room vs. Urgent Care?",
        answer:
          "Go to the Emergency Room for potentially life-threatening conditions such as chest pain, severe bleeding, difficulty breathing, or serious injuries. Choose Urgent Care for non-life-threatening issues that require same-day care, such as sprains, minor infections, or fever.",
      },
      {
        id: 13,
        question: "How does the ER prioritize patients?",
        answer:
          "The ER uses a triage system to assess patients based on the severity of their condition, not arrival time. Patients with life-threatening conditions are seen first. This means those with less severe symptoms may experience longer wait times, even if they arrived earlier.",
      },
    ],
  };

  // All categories for the filter
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "admissions", name: "Admissions & Registration" },
    { id: "insurance", name: "Insurance & Billing" },
    { id: "visitation", name: "Visitation" },
    { id: "medical", name: "Medical Records & Prescriptions" },
    { id: "facilities", name: "Facilities & Amenities" },
    { id: "emergency", name: "Emergency Care" },
  ];

  // Flatten the faq data for searching and filtering
  const allFaqs = Object.entries(faqData).flatMap(([category, questions]) =>
    questions.map((q) => ({ ...q, category }))
  );

  // Filter based on search and category
  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (id: any) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our services,
            policies, and procedures.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-4 top-3.5 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                  ${
                    activeCategory === category.id
                      ? "bg-blue-700 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="mb-4 bg-white rounded-lg shadow overflow-hidden"
              >
                <button
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openQuestion === faq.id ? (
                    <ChevronUp
                      className="flex-shrink-0 text-blue-700"
                      size={20}
                    />
                  ) : (
                    <ChevronDown
                      className="flex-shrink-0 text-gray-500"
                      size={20}
                    />
                  )}
                </button>

                {openQuestion === faq.id && (
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No questions found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-blue-700 hover:text-blue-900 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Our patient support team is available to help you with any questions
            not answered here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Call Us</h4>
              <p className="text-gray-700">Monday to Friday, 8am - 6pm</p>
              <p className="text-blue-700 font-semibold mt-2">(555) 123-4567</p>
            </div>
            <div className="text-center bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold mb-2">Email Us</h4>
              <p className="text-gray-700">We'll respond within 24 hours</p>
              <p className="text-blue-700 font-semibold mt-2">
                support@medcarehospital.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
