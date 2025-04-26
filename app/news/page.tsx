"use client";
import React, { useState } from "react";
import { Calendar, Clock, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { newsEventsData } from "@/data/newsEvents";

const Page = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");


  // Filter items based on active tab and search term
  const filteredItems = newsEventsData.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  return (
    <div className="py-10">
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Stay updated with the latest news, events, and announcements from
            GastroCare Hospital..
          </p>
        </div>
      </div>

      {/* News & Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                activeTab === "all"
                  ? "bg-white shadow-sm text-blue-700"
                  : "text-gray-700 hover:text-blue-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`px-4 py-2 rounded-md text-sm font-medium  cursor-pointer ${
                activeTab === "news"
                  ? "bg-white shadow-sm text-blue-700"
                  : "text-gray-700 hover:text-blue-700"
              }`}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab("event")}
              className={`px-4 py-2 rounded-md text-sm font-medium  cursor-pointer ${
                activeTab === "event"
                  ? "bg-white shadow-sm text-blue-700"
                  : "text-gray-700 hover:text-blue-700"
              }`}
            >
              Events
            </button>
          </div>

          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search news and events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </div>

        {/* News and Events Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{item.date}</span>
                    {item.type === "event" && (
                      <>
                        <Clock size={16} className="ml-4 mr-2" />
                        <span>{item.time}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>

                  <Link
                    href={`/news/${item.id}`}
                    className="text-blue-700 font-medium flex items-center hover:text-blue-900 transition-colors"
                  >
                    Read more <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found matching your criteria.
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-blue-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600">
              Subscribe to our newsletter to receive the latest news and events.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
