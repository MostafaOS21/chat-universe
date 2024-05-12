"use client";

import { useEffect, useState } from "react";

export default function useHasMore({
  data,
  limiter,
}: {
  data?: any[];
  limiter: number;
}) {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (data) {
      if (data.length < limiter) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } else {
      setHasMore(false);
    }
  }, [data]);

  return { hasMore };
}
