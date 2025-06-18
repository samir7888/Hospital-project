"use client";
import {
  CategoryResponse,
  NewsAndEventsResponse,
} from "@/app/types/blogs-type";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
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
              <Link key={item.id} href={`/news/${item.slug}`}>
                <div
                  key={item.id}
                  className="group h-96  bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="h-64 relative overflow-hidden group-hover:h-36 duration-500">
                    <Image
                      fill
                      src={
                        item.featuredImage.url || "https://placehold.co/600x400"
                      }
                      alt={item.title}
                      className="w-full absolute top-0 h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3 ">
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
                    <p className="opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:line-clamp-4 text-gray-600 mb-4 duration-500">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </Link>
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
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-500"
          >
            View All News & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
