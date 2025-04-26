"use client";
import React, { useState, useEffect } from "react";

import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex(
          (prevIndex) => (prevIndex + 1) % testimonialsData.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    setIsPaused(true);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Patient Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what our patients have to say about their experience at
            GastroCare Hospital.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <div className="flex mt-2 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-600 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
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

          {/* Dots */}
          <div className="flex justify-center mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 mx-1 rounded-full ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
