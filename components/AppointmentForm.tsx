"use client";
import React, { useState } from "react";
import {
  appointmentSchema,
  zodFormDataSchema,
} from "./validation/AdmissionFormValidation";
import { submitAppointment } from "../lib/actions/appointment-actions";
import { toast } from "sonner";

const AppointmentForm = () => {
  const [formData, setFormData] = useState<zodFormDataSchema>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    department: "gastroenterology",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validate form data
    const validation = appointmentSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      console.error("Validation errors:", fieldErrors);
      return;
    } else {
      setErrors({});
    }

    setIsLoading(true);

    try {
      // Submit appointment data using server action
      const result = await submitAppointment(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to submit appointment");
      }
      toast.success("Appointment submitted successfully!");
      console.log("Appointment submitted successfully:", result.data);
      setIsSubmitted(true);

      // Reset form after successful submission and delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          date: "",
          address: "",
          time: "",
          department: "gastroenterology",
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Failed to submit appointment:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit appointment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:w-1/2 ">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        {isSubmitted ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mt-6">
              Appointment Request Submitted!
            </h3>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Thank you for choosing GastroCare Hospital. We'll contact you
              shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display submission error if any */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>
              <div className="h-px bg-gray-200 w-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                placeholder="Enter your address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>
              )}
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-lg font-medium text-gray-900">
                Appointment Details
              </h3>
              <div className="h-px bg-gray-200 w-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date[0]}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department/Specialty *
              </label>
              <div className="relative">
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`appearance-none w-full px-4 py-2.5 rounded-lg border ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50`}
                >
                  <option value="">Select Department</option>
                  <option value="gastroenterology">Gastroenterology</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="gynecology">Gynecology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="general">General Medicine</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400`}
                placeholder="Please share any symptoms or concerns..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message[0]}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              By submitting this form, you agree to our privacy policy and terms
              of service.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
