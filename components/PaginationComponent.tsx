"use client";

// import type { Meta } from "@/schema/Doctors";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Meta } from "@/app/types/doctor-type";
import { Button } from "./ui/button";

interface Props {
  meta: Meta;
}

const PaginationComponent = ({ meta }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-between pt-8"
    >
      <div className="text-muted-foreground">
        <p>
          Showing page {meta.page} of {meta.pageCount} pages{" "}
        </p>
        <p>Total items {meta.itemCount}</p>
      </div>

      <ul className="flex items-center space-x-1">
        <li>
          <Button
            onClick={() => updatePage(meta.page - 1)}
            type="button"
            disabled={!meta.hasPreviousPage}
          >
            <ChevronLeft />
            Previous
          </Button>
        </li>

        <li>
          <Button
            type="button"
            disabled={!meta.hasNextPage}
            onClick={() => updatePage(meta.page + 1)}
          >
            Next
            <ChevronRight />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
