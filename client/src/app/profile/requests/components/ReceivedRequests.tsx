"use client";
import { Suspense, useRef, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  requestsLimit,
  useGetReceivedRequestsQuery,
} from "@/lib/redux/services/requests/requestsService";
import LoadingDummySkeleton from "./LoadingDummySkeleton";
import useHasMore from "@/hooks/useHasMore";
import { Button } from "@/components/ui/button";
import { SkeletonLoaders } from "./SkeletonLoaders";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectReceivedRequests } from "@/lib/redux/features/requests/requestsSlice";
import RequestsList from "./RequestsList";

export const dynamic = "force-dynamic";

const currentPage = 1;

export default function ReceivedRequests() {
  const showMoreRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(currentPage);
  const { isLoading, isFetching, data } = useGetReceivedRequestsQuery({
    page,
    limit: 1,
  });
  const { hasMore } = useHasMore({ data: data?.data, limiter: requestsLimit });
  const requests = useAppSelector(selectReceivedRequests);

  return (
    <div className="grid grid-cols-1 gap-3 mb-3" ref={showMoreRef}>
      <Suspense fallback={<SkeletonLoaders />}>
        <RequestsList items={requests} type="received" />
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
