"use client";

import { RefObject, useEffect, useState } from "react";

interface IInfiniteScrollProps {
  refTarget: RefObject<HTMLDivElement>;
  currentPage: number;
}

export default function useInfiniteScroll({
  refTarget,
  currentPage = 1,
}: IInfiniteScrollProps) {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scrollHeight = target.scrollHeight;
      const scrollTop = target.scrollTop;
      const clientHeight = target.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };

    refTarget.current?.addEventListener("scroll", handleScroll);

    return () => {
      refTarget.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { page, setPage };
}
