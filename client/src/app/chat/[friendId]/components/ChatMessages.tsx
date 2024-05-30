"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetChatFriendProfileQuery,
  useGetChatQuery,
} from "@/lib/redux/services/chat/chatService";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import FriendProfileBar from "./FriendProfileBar";
import { Separator } from "@/components/ui/separator";

export default function ChatMessages() {
  const { friendId } = useParams();
  const { data: chatMessages } = useGetChatQuery(friendId as string);

  return (
    <>
      <div className="flex flex-col flex-1 px-8">
        <div className="flex-1">messages</div>
        <div className="w-full flex items-center bg-input rounded-md border focus-within:border-primary/30">
          <Input
            placeholder="Type Something..."
            className="!ring-0 !ring-offset-0 border-0 bg-transparent"
          />

          <Button variant={"ghost"} className="hover:bg-primary/5">
            <Send className="text-primary" size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}
