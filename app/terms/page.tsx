import SanitizeBody from "@/components/html-sanitize";
import { serverFetch } from "@/lib/server-fetch";

interface Props {
  termsAndConditions: string;
}

export default async function PrivacyPolicyPage() {
  const terms = await serverFetch<Props>("general-setting/terms-and-condition");
  if (!terms) {
    return <div className="min-h-screen py-24 mx-auto flex flex-col justify-center items-center">Loading...</div>;
  }
  return (
    <main className="min-h-screen container px-1 py-24 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl md:text-5xl font-bold p-8 md:p-12">Terms and Conditions</h1>
        <SanitizeBody description={terms.termsAndConditions} />
    </main>
  );
}
