import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { serverFetch } from "@/lib/server-fetch";
import {
  BaseNewsAndEvents,
  NewsAndEventsResponse,
} from "@/app/types/blogs-type";
import SanitizeBody from "@/components/html-sanitize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const newsItem = await serverFetch<BaseNewsAndEvents>(`blogs/${slug}`);

    if (!newsItem) {
      return {
        title: "News Not Found",
        description: "The requested news article does not exist.",
      };
    }

    return {
      title: `${newsItem.title} - Hospital News`,
      description: newsItem?.summary || "Hospital news article",
      openGraph: {
        title: newsItem.title,
        description: newsItem?.summary || "Hospital news article",
        images: newsItem.coverImage?.url ? [newsItem.coverImage.url] : [],
        type: "article",
        publishedTime: newsItem.createdAt,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "News Not Found",
      description: "The requested news article does not exist.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Fetch both newsItem and blogs with error handling
    const [newsItem, blogs] = await Promise.allSettled([
      serverFetch<BaseNewsAndEvents>(`blogs/${slug}`),
      serverFetch<NewsAndEventsResponse>(`blogs`),
    ]);

    // Check if newsItem fetch was successful and has data
    if (newsItem.status === "rejected" || !newsItem.value) {
      console.error(
        "News item not found or fetch failed:",
        newsItem.status === "rejected" ? newsItem.reason : "No data"
      );
      notFound();
    }

    const newsData = newsItem.value;
    const blogsData = blogs.status === "fulfilled" ? blogs.value : null;

    // Get related articles logic
    let relatedArticles: BaseNewsAndEvents[] = [];
    
    if (blogsData?.data && blogsData.data.length > 1) {
      const allOtherArticles = blogsData.data.filter(item => item.slug !== newsData.slug);
      
      // First, get articles from the same category
      const sameCategoryArticles = allOtherArticles.filter(
        item => item.category.name === newsData.category.name
      );
      
      // If we have articles from the same category, use them
      if (sameCategoryArticles.length > 0) {
        relatedArticles = sameCategoryArticles.slice(0, 3);
        
        // If we don't have enough articles from the same category, fill with others
        if (sameCategoryArticles.length < 3) {
          const otherArticles = allOtherArticles.filter(
            item => item.category.name !== newsData.category.name
          );
          const remainingSlots = 3 - sameCategoryArticles.length;
          relatedArticles = [
            ...sameCategoryArticles,
            ...otherArticles.slice(0, remainingSlots)
          ];
        }
      } else {
        // If no articles from same category, show other articles
        relatedArticles = allOtherArticles.slice(0, 3);
      }
    }

    const hasRelatedArticles = relatedArticles.length > 0;

    return (
      <div className="container mx-auto px-4 mt-16 md:mt-24">
        {/* Main content grid with conditional columns */}
        <div
          className={`grid grid-cols-1 gap-8 ${
            hasRelatedArticles ? "lg:grid-cols-3" : ""
          }`}
        >
          {/* Left column - Takes up 2/3 or full width depending on related articles */}
          <section className={hasRelatedArticles ? "lg:col-span-2" : ""}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-56 md:h-72 lg:h-96">
                <Image
                  src={newsData.coverImage?.url || "/placeholder-image.jpg"}
                  alt={newsData?.title || "News article"}
                  fill
                  className="object-cover"
                  priority
                />
                {newsData.category?.name && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {newsData?.category.name}
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 lg:p-8">
                <p className="text-gray-500 mb-2">
                  {newsData.createdAt
                    ? new Date(newsData.createdAt).toLocaleDateString()
                    : "Date not available"}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {newsData.title}
                </h1>
                <div className="">
                  <SanitizeBody description={newsData.content} />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">
                    Share this article
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                      Facebook
                    </button>
                    <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors">
                      Twitter
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right column - Only show if there are related articles */}
          {hasRelatedArticles && (
            <div className="lg:col-span-1">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {relatedArticles.map((item) => (
                  <Link
                    href={`/news/${item.slug}`}
                    key={item.slug}
                    className="block"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 w-full">
                        <Image
                          src={
                            item.featuredImage?.url ||
                            "/placeholder-image.jpg"
                          }
                          alt={item.title || "Related article"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-gray-500 text-sm mb-1">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "Date not available"}
                        </p>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        {/* Optional: Show category badge to indicate if it's same category */}
                        {item.category.name === newsData.category.name && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {item.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in page component:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await serverFetch<NewsAndEventsResponse>(`blogs`);

    if (!blogs?.data || blogs.data.length === 0) {
      console.warn("No blogs found for static params generation");
      return [];
    }

    return blogs.data.map((blog) => ({
      slug: String(blog.slug),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}