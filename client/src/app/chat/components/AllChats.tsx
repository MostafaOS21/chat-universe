"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { selectFriends } from "@/lib/redux/features/friends/friendsSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { useGetLatestChatsQuery } from "@/lib/redux/services/chat/chatService";
import FriendsChatList from "./FriendsChatList";

export default function AllChats() {
  const { isLoading: isGettingFriends } = useGetLatestChatsQuery({});
  const { toast } = useToast();
  const friends = useAppSelector(selectFriends);

  let content;

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
