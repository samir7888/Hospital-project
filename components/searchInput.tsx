"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDebounce } from "./debounce";
import { Input } from "./ui/input";

type Props = {
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  className,
  placeholder = "Search...",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search")?.trim() || "");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    
    // Use replace to avoid adding to browser history
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, searchParams, pathname, router]);

  return (
    <div className="flex items-center">
      <div className={cn("relative", className)}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={placeholder}
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
        />
      </div>
    </div>
  );
}