"use client";
import {
  CategoryResponse,
  NewsAndEventsResponse,
} from "@/app/types/blogs-type";
import Link from "next/link";
import React, { useState } from "react";

interface NewsEventProps {
  blogsData: NewsAndEventsResponse;
  categoriesData: CategoryResponse[];
}

const NewsEvents: React.FC<NewsEventProps> = ({
  blogsData,
  categoriesData,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Fixed filtering logic
  const filteredItems =
    activeTab === "all"
      ? blogsData.data
      : blogsData.data.filter(
          (item) => item.category.name.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <section id="news" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            News & Events
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and innovations at
            GastroCare Hospital.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            {/* All tab */}
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              All
            </button>

            {/* Dynamic category tabs */}
            {categoriesData.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.name)}
                className={`px-4 py-2 text-sm font-medium ${
                  index === categoriesData.length - 1 ? "rounded-r-md" : ""
                } ${
                  activeTab === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border-t border-b border-r border-gray-300`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-${
            filteredItems.length >= 3 ? 3 : 2
          } lg:grid-cols-${
            filteredItems.length >= 4 ? 4 : filteredItems.length
          }`}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.featuredImage.url  || 'https://placehold.co/600x400'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                      {item.category.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">
                No items found for the selected category.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View All News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
