"use client";

import DOMPurify from "isomorphic-dompurify";


const SanitizeBody = ({ description }: { description: string }) => {
  return (
    <div
      className="mx-auto prose lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
    />
  );
};

export default SanitizeBody;
