"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IReceivedRequests } from "@/lib/interfaces";
import { getAvatarUrl, sliceString } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useGetReceivedRequestsQuery } from "@/lib/redux/services/requests/requestsService";
import { SkeletonLoaders } from "./SkeletonLoaders";

export const dynamic = "force-dynamic";

export default function ReceivedRequests() {
  const showMoreRef = useRef<HTMLDivElement>(null);
  const { page } = useInfiniteScroll({
    refTarget: showMoreRef,
    currentPage: 1,
  });
  const { data } = useGetReceivedRequestsQuery({ page, limit: 1 });
  // console.log(data);

  // const [users, setUsers] = useState(data?.data || []);

  // useEffect(() => {
  //   console.log(page);

  //   if (data?.data !== undefined) {
  //     setUsers((prev) => [...prev, ...(data.data as IReceivedRequests[])]);
  //   }
  // }, [page, data]);

  // if (!data?.data) return <div>No requests</div>;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3"
      ref={showMoreRef}
    >
      {/* {data.data.map((item) => (
        <RequestItem key={item._id} item={item} />
      ))} */}

      <SkeletonLoaders />
    </div>
  );
}
