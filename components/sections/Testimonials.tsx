"use client";
import React, { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import {
  ITestimonial,
  TestimonialResponse,
} from "@/app/types/testimonial-type";
import { serverFetch } from "@/lib/server-fetch";
import Image from "next/image";

// Star Rating Component with half star support
function StarRating({
  rating,
  maxStars = 5,
}: {
  rating: number;
  maxStars?: number;
}) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const filled = rating >= i;
    const halfFilled = rating >= i - 0.5 && rating < i;

    stars.push(
      <div key={i} className="relative inline-block">
        {/* Background star (empty) */}
        <Star className="h-4 w-4 text-gray-300" />

        {/* Filled star overlay */}
        {filled && (
          <Star className="absolute top-0 left-0 h-4 w-4 text-yellow-400 fill-yellow-400" />
        )}

        {/* Half-filled star overlay */}
        {halfFilled && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
        )}
      </div>
    );
  }

  return <div className="flex">{stars}</div>;
}
const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const data = await serverFetch<TestimonialResponse>("testimonials"); // Adjust API endpoint as needed
      if (!data) {
        setError("Failed to load testimonials");
        setLoading(false);
        return;
      }
      setTestimonials(data);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused && testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsPaused(true);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  // Loading state
  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Patient Testimonials
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Loading testimonials...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Patient Testimonials
            </h2>
            <p className="mt-4 text-xl text-red-600 max-w-3xl mx-auto">
              Failed to load testimonials. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Patient Testimonials
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what people have to say about our services
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col items-center text-center">
                      <div className=" relative w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        {testimonial.personImage?.url ? (
                          <Image
                            fill
                            src={testimonial?.personImage?.url}
                            alt={testimonial.personName}
                            className="rounded-full absolute top-0 left-0"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-blue-600">
                            {testimonial.personName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {testimonial.personName}
                      </h3>
                      {testimonial.personCompany && (
                        <p className="text-blue-600 font-medium">
                          {testimonial.personCompany}
                        </p>
                      )}
                      <div className="flex mt-2 mb-4">
                        <StarRating rating={testimonial.personRating} />
                      </div>
                      <p className="text-gray-600 italic">
                        "{testimonial.personMessage}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 px-4">
              <button
                onClick={handlePrev}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
              >
                <ArrowLeft className="h-6 w-6 text-blue-600" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
              >
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </button>
            </div>
          )}

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 w-3 mx-1 rounded-full ${
                    index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
