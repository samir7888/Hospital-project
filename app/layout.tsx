import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { serverFetch } from "@/lib/server-fetch";
import { AboutPageData } from "./types/aboutpage-type";
import { SiteSettings } from "./types/sitesetting-type";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await serverFetch<AboutPageData>("home-page");

  return {
    title: aboutData?.metadata?.title || " GastroCare Hospital",
    description: aboutData?.metadata?.description || "Learn more about our hospital and its values.",
    keywords: aboutData?.metadata?.keywords || ["hospital", "healthcare", "about us"],
  };
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const SiteSettings = await serverFetch<SiteSettings>("general-setting");
  if (!SiteSettings) {
    return <>Error loading site settings</>;
    
  }
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar siteSetting={SiteSettings} />
        <div className="">{children}</div>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
