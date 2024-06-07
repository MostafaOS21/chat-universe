"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { selectFriends } from "@/lib/redux/features/friends/friendsSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import FriendsChatList from "./FriendsChatList";

export default function AllChats() {
  const friends = useAppSelector(selectFriends);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <FriendsChatList friends={friends} />
      <FriendsSkeletons />
    </div>
  );
}

const FriendsSkeletons = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div key={index} className="flex  gap-3 items-center p-3 rounded-lg">
      <Skeleton className="w-10 h-10" />
      <div className="flex flex-col gap-1 ">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-24 h-4" />
      </div>
    </div>
  ));
};
