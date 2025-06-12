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

  // Fetch both newsItem and blogs with error handling
  const [newsItem, blogs] = await Promise.all([
    serverFetch<BaseNewsAndEvents>(`blogs/${slug}`),
    serverFetch<NewsAndEventsResponse>(`blogs`),
  ]);

  // Get related articles logic
  let relatedArticles: BaseNewsAndEvents[] = [];

  if (blogs?.data && blogs.data.length > 1) {
    const allOtherArticles = blogs?.data.filter(
      (item) => item.slug !== newsItem?.slug
    );

    // First, get articles from the same category
    const sameCategoryArticles = allOtherArticles.filter(
      (item) => item.category.name === newsItem?.category.name
    );

    // If we have articles from the same category, use them
    if (sameCategoryArticles.length > 0) {
      relatedArticles = sameCategoryArticles.slice(0, 3);
    } else {
      // If no articles from same category, show other articles
      relatedArticles = allOtherArticles.slice(0, 3);
    }
  }

  const hasRelatedArticles = relatedArticles.length > 0;

  if (!newsItem) {
    return <div>Not found</div>;
  }

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
                src={newsItem?.coverImage?.url || "/placeholder-image.jpg"}
                alt={newsItem?.title || "News article"}
                fill
                className="object-cover"
                priority
              />
              {newsItem?.category?.name && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {newsItem?.category.name}
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 lg:p-8">
              <p className="text-gray-500 mb-2">
                {newsItem?.createdAt
                  ? new Date(newsItem?.createdAt).toLocaleDateString()
                  : "Date not available"}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {newsItem?.title}
              </h1>
              <div className="">
                <SanitizeBody description={newsItem?.content} />
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
        {relatedArticles.length > 0 && (
          <aside className="mt-16 lg:mt-0">
            <h2 className="text-xl font-bold mb-6">
              {relatedArticles.some(
                (item) => item.category.name === newsItem?.category.name
              )
                ? "Related Articles"
                : "Other Articles"}
            </h2>
            <div className="grid gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={article.featuredImage?.url || "/placeholder-image.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await serverFetch<NewsAndEventsResponse>(`blogs`);

  if (!blogs?.data || blogs.data.length === 0) {
    console.warn("No blogs found for static params generation");
    return [];
  }

  return blogs.data.map((blog) => ({
    slug: String(blog.slug),
  }));
}
