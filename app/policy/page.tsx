import SanitizeBody from "@/components/html-sanitize";
import { serverFetch } from "@/lib/server-fetch";

interface Props {
  privacyPolicy: string;
}

export default async function PrivacyPolicyPage() {
  const privacyPolicy = await serverFetch<Props>("general-setting/privacy-policy");
  if (!privacyPolicy) {
    return <div className="min-h-screen py-24 mx-auto flex flex-col justify-center items-center">Loading...</div>;
  }
  return (
    <main className="min-h-screen px-1 py-24 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl md:text-5xl font-bold p-18">Privacy Policy</h1>
        <SanitizeBody description={privacyPolicy.privacyPolicy} />
    </main>
  );
}
