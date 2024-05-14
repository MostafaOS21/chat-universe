"use client";
import {
  requestsLimit,
  useGetSentRequestsQuery,
} from "@/lib/redux/services/requests/requestsService";
import { SkeletonLoaders } from "./SkeletonLoaders";
import { Suspense, useEffect, useRef, useState } from "react";
import RequestsList from "./RequestsList";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectSentRequests } from "@/lib/redux/features/requests/requestsSlice";
import LoadingDummySkeleton from "./LoadingDummySkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useHasMore from "@/hooks/useHasMore";
import { Button } from "@/components/ui/button";

const currentPage = 1;

export default function SentRequest() {
  const showMoreRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(currentPage);
  const { isSuccess, isFetching, data, isLoading } = useGetSentRequestsQuery({
    page,
  });
  const requests = useAppSelector(selectSentRequests);
  const { hasMore } = useHasMore({ data: data?.data, limiter: requestsLimit });
  // false true undefined true false

  return (
    <div className="grid grid-cols-1 gap-3 mb-3" ref={showMoreRef}>
      <Suspense fallback={<SkeletonLoaders />}>
        <RequestsList items={requests} type="sent" />
      </Suspense>

      <Button
        onClick={(_) => setPage((v) => v + 1)}
        variant={"secondary"}
        disabled={isLoading || isFetching || !hasMore}
      >
        Load More
      </Button>
      {isFetching || isLoading ? <LoadingDummySkeleton /> : null}
    </div>
  );
}
