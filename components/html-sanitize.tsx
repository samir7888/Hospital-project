"use client";

import DOMPurify from "isomorphic-dompurify";


const SanitizeBody = ({ description }: { description: string }) => {
  return (
    <div
      className="min-w-full prose lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
    />
  );
};

export default SanitizeBody;
