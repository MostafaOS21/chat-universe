import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/lib/redux/features/friends/friendsSlice";
import { getAvatarUrl } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import SingleChatFriend from "./SingleChatFriend";

export default function FriendsChatList({ friends }: { friends: Friend[] }) {
  return friends.map((friend) => (
    <SingleChatFriend key={friend._id.toString()} friend={friend} />
  ));
}
