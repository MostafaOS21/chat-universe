import React from "react";
import ChatMessages from "./components/ChatMessages";
import FriendProfileBar from "./components/FriendProfileBar";
import { Separator } from "@/components/ui/separator";

interface FriendChatProps {
  params: { friendId: string };
}

export default function FriendChat({ params: { friendId } }: FriendChatProps) {
  return (
    <div className="h-[95vh] w-full flex flex-col">
      <FriendProfileBar />

      <Separator />

      <ChatMessages />
    </div>
  );
}
