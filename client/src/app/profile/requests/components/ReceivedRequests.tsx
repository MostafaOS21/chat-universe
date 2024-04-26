"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IReceivedRequests } from "@/lib/interfaces";
import { useGetReceivedRequestsQuery } from "@/lib/redux/api/rtk-query-api";
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

export const dynamic = "force-dynamic";

const RequestItem = ({ item }: { item: IReceivedRequests }) => {
  return (
    <div className="w-full flex items-center gap-3 p-3 bg-secondary/55 rounded-lg">
      <Avatar>
        <AvatarImage
          src={getAvatarUrl(item.sender.image)}
          alt="Sender avatar image"
          className="w-[40px] h-[40px]"
        />
      </Avatar>

      <div className="text-sm grid grid-cols-1">
        <p>{sliceString(item.sender.name, 80)}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-xs">
              @{sliceString(item.sender.username, 20)}
            </TooltipTrigger>
            <TooltipContent>
              <p>@{item.sender.username}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="ml-auto">
        <Button
          className="text-red-700 hover:text-red-800 bg-transparent rounded-lg"
          variant={"ghost"}
        >
          <X size={17} />
        </Button>
        <Button
          className="text-green-700 hover:text-green-800 bg-transparent rounded-lg"
          variant={"ghost"}
        >
          <Check size={17} />
        </Button>
      </div>
    </div>
  );
};

const SkeletonLoaders = () => {
  return (
    <>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
      <div className="w-full flex items-center gap-3 p-3">
        <Skeleton className="w-[40px] h-[40px]" />

        <div className="grid grid-cols-1 gap-1">
          <Skeleton className="w-[130px] h-[15px]" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>

        <div className="grid grid-cols-2 gap-1 ml-auto">
          <Skeleton className="w-[35px] h-[35px]" />
          <Skeleton className="w-[35px] h-[35px]" />
        </div>
      </div>
    </>
  );
};

export default function ReceivedRequests() {
  const showMoreRef = useRef<HTMLDivElement>(null);
  const { page } = useInfiniteScroll({
    refTarget: showMoreRef,
    currentPage: 1,
  });
  const { data } = useGetReceivedRequestsQuery({ page, limit: 1 });
  const [users, setUsers] = useState(data?.data || []);

  useEffect(() => {
    console.log(page);

    if (data?.data !== undefined) {
      setUsers((prev) => [...prev, ...(data.data as IReceivedRequests[])]);
    }
  }, [page, data]);

  if (!data?.data) return <div>No requests</div>;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3"
      ref={showMoreRef}
    >
      {data.data.map((item) => (
        <RequestItem key={item._id} item={item} />
      ))}

      <SkeletonLoaders />
    </div>
  );
}
