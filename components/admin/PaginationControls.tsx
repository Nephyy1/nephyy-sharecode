"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls({
  hasNextPage,
  hasPrevPage,
}: {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '10';

  return (
    <div className="flex gap-2 justify-center pt-4">
      <Button
        variant="outline"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`${pathname}?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <Button
        variant="outline"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`${pathname}?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
