"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useAppQuery } from "@/utils/react-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CategoryResponse } from "@/app/types/blogs-type";
import { serverFetch } from "@/lib/server-fetch";
import { Spinner } from "./spinner";

const CategoryTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [categories, setCategories] = useState<CategoryResponse[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    serverFetch<CategoryResponse[]>(`blog-categories`).then((data) => {
      if (isMounted) setCategories(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync URL param when category changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Use replace to avoid adding to browser history
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, searchParams, pathname, router]);

  if (!categories) {
    return (
      <div className=" animate-pulse bg-gray-200 h-8 w-8 rounded-md"></div>
    );
  }
  return (
    <Tabs
      value={category}
      onValueChange={(value) => setCategory(value)}
      className="w-full md:w-auto bg-white"
    >
      <TabsList className={`w-full flex md:w-auto gap-3`}>
        {/* Always show "All" tab first */}
        <TabsTrigger value="all" className="text-sm">
          All
        </TabsTrigger>

        {/* Dynamically render category tabs */}
        {categories?.map((categoryItem) => (
          <TabsTrigger
            key={categoryItem.id}
            value={categoryItem.name}
            className="text-sm  capitalize w-fit cursor-pointer"
            title={categoryItem.name} // Show full name on hover
          >
            {categoryItem.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
