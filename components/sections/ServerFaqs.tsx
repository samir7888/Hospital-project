import { FaqResponse } from "@/app/types/faqs-type";
import { FAQClient } from "./FAQ";
import { CompanyInfoResponse } from "@/app/types/company-type";

// Server Component Wrapper
const FAQ = async () => {
  const { serverFetch } = await import("@/lib/server-fetch");
  
  const [filteredFaqs, companyInfo] = await Promise.all([
    serverFetch<FaqResponse>("faqs"),
    serverFetch<CompanyInfoResponse>("company-info"),
  ]);

  if (!filteredFaqs) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-medium">Error loading FAQs</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <FAQClient faqData={filteredFaqs} companyInfo={companyInfo} />;
};

export default FAQ;