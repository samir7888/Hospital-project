import { CategoryResponse, NewsAndEventsResponse } from "@/app/types/blogs-type";
import NewsEvents from "./NewsEvents"; // Import the client component

// Server Component Wrapper
const NewsEventsPage = async () => {
  const { serverFetch } = await import("@/lib/server-fetch");
  
  try {
    const [blogs, categories] = await Promise.all([
      serverFetch("blogs"),
      serverFetch("blog-categories")
    ]);

    if (!blogs || !categories) {
      return (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error loading News & Events
            </h2>
            <p className="text-gray-600">
              Please try again later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <NewsEvents 
        blogsData={blogs as NewsAndEventsResponse} 
        categoriesData={categories as CategoryResponse[]} 
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error loading News & Events
          </h2>
          <p className="text-gray-600">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default NewsEventsPage;