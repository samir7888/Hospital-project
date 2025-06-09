import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Doctor Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The doctor you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/doctors"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Back to Doctors
        </Link>
      </div>
    </div>
  );
}
