import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsEventsData } from "@/data/newsEvents";
import { Metadata } from "next";

export function generateStaticParams() {
  return newsEventsData.map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const newsId = parseInt(params.id);
  const newsItem = newsEventsData.find((item) => item.id === newsId);

  if (!newsItem) {
    return {
      title: "News Not Found",
      description: "The requested news article does not exist.",
    };
  }

  return {
    title: `${newsItem.title} - Hospital News`,
    description: `${newsItem.excerpt}`,
    openGraph: {
      title: newsItem.title,
      description: newsItem.excerpt,
      images: [newsItem.image],
      type: 'article',
      publishedTime: newsItem.date,
    },
  };
}

export default function NewsDetail({ params }: { params: { id: string } }) {
  const newsItem = newsEventsData.find(
    (item) => item.id === parseInt(params.id)
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 mt-16 md:mt-24">
      {/* Main content grid with asymmetric columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Takes up 2/3 of the space on large screens */}
        <section className="lg:col-span-2">
          <Link
            href="/news"
            className="hidden text-blue-500 text-lg md:text-2xl hover:underline mb-6 md:inline-block"
          >
            &larr; Back to all news
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-56 md:h-72 lg:h-96">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {newsItem.category}
              </div>
            </div>

            <div className="p-4 md:p-6 lg:p-8">
              <p className="text-gray-500 mb-2">{newsItem.date}</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{newsItem.title}</h1>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700">{newsItem.excerpt}</p>

                {/* This would be expanded with more content in a real application */}
                <div className="mt-6">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquet
                    nisl, eget aliquet nisl nisl eget nisl. Nullam auctor, nisl
                    eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet
                    nisl nisl eget nisl.
                  </p>
                  <p className="mt-4">
                    Nullam auctor, nisl eget ultricies lacinia, nisl nisl aliquet
                    nisl, eget aliquet nisl nisl eget nisl. Nullam auctor, nisl
                    eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet
                    nisl nisl eget nisl.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Facebook
                  </button>
                  <button className="bg-sky-500 text-white px-4 py-2 rounded">
                    Twitter
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right column - Takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 gap-6">
            {newsEventsData
              .filter((item) => item.id !== newsItem.id)
              .slice(0, 3)
              .map((item) => (
                <Link href={`/news/${item.id}`} key={item.id} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-500 text-sm mb-1">{item.date}</p>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}