
import type { Metadata } from "next";
import { HomePageData } from "../types/heropage-type";
import { serverFetch } from "@/lib/server-fetch";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
