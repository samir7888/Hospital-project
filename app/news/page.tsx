import React from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { serverFetch } from "@/lib/server-fetch";
import SubscribeForm from "./components/SubscribeForm";
import SearchInput from "@/components/searchInput";
import CategoryTabs from "@/components/category-tabs";
import { NewsAndEventsResponse } from "../types/blogs-type";

export type NewsEventsPageProps = {
  searchParams: {
    search?: string;
    category?: string;
  };
};

const Page = async (props: {
  searchParams: Promise<NewsEventsPageProps["searchParams"]>;
}) => {
  const searchParams = await props.searchParams;
  const queryParams = new URLSearchParams(searchParams);
  const queryString = queryParams.toString();

  return (
    <div className="py-10">
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Stay updated with the latest news, events, and announcements from
            GastroCare Hospital.
          </p>
        </div>
      </div>

      {/* News & Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <CategoryTabs />

          <SearchInput />
        </div>

        {/* News and Events Grid */}
        <NewsEventsGrid queryString={queryString} />

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

          <SubscribeForm />
        </div>
      </div>
    </div>
  );
};

async function NewsEventsGrid({ queryString }: { queryString: string }) {
  const url = `blogs${queryString ? `?${queryString}` : ""}`;
  const filteredItems = await serverFetch<NewsAndEventsResponse>(url);

  if (!filteredItems || filteredItems?.data?.length === 0) {
    return (
      <div className="text-center flex flex-col justify-center items-center py-12">
        <h3 className="text-xl font-medium text-gray-600">
          No news or events found
        </h3>
        {queryString.includes("search=") && (
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredItems.data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={item.coverImage?.url ?? ""}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            {/* <div className="absolute top-4 right-4 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">
              {item.category}
            </div> */}
          </div>

          <div className="p-6">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <Calendar size={16} className="mr-2" />
               <span className="text-gray-500">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "Date not available"}
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.summary}</p>

            <Link
              href={`/news/${item.slug}`}
              className="text-blue-700 font-medium flex items-center hover:text-blue-900 transition-colors"
            >
              Read more <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
