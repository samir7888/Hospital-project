"use client";

import Link from "next/link";
import React from "react";

const ShareButtons = ({
  articleUrl,
  title,
}: {
  articleUrl: string;
  title: string;
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Facebook
        </Link>
        <Link
          href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
        >
          Twitter
        </Link>
        <Link
          href={`mailto:?subject=${title}&body=${articleUrl}`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Email
        </Link>
      </div>
    </div>
  );
};

export default ShareButtons;
