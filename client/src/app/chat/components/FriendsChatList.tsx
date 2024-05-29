import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/lib/redux/features/friends/friendsSlice";
import { getAvatarUrl } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function FriendsChatList({ friends }: { friends: Friend[] }) {
  return friends.map((friend) => (
    <Link
      href={`chat/${friend._id.toString()}`}
      className="flex  gap-3 items-center hover:bg-gray-100 p-3 rounded-lg"
      key={friend._id.toString()}
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src={getAvatarUrl(friend.image)} />
      </Avatar>

      <div className="flex flex-col gap-1 text-sm">
        <p>{friend.name}</p>
        <p className="text-xs">Say hi!</p>
      </div>
    </Link>
  ));
}
