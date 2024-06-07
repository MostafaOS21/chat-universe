"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMessage } from "@/lib/interfaces";
import {
  useGetChatFriendProfileQuery,
  useGetChatQuery,
} from "@/lib/redux/services/chat/chatService";
import { socket } from "@/socket";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useOptimistic, useRef, useState } from "react";

export default function ChatMessages() {
  const { friendId } = useParams();
  const { data: chatMessages } = useGetChatQuery(friendId as string);
  const userAuth = useSession();
  const messageInputRef = useRef<HTMLInputElement>(null);
  // Messages States
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [optimisticMessages, setOptimisticMessages] =
    useOptimistic<IMessage[]>(messages);

  // Listen for messages
  useEffect(() => {
    socket.on("receiveMessage", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Send message
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sender = userAuth.data?.user?.id;

    const messageContent = messageInputRef.current?.value;

    if (!messageContent || !sender || !friendId) return;
    let receiver: string;

    // check if the friendId is an array
    if (Array.isArray(friendId)) {
      receiver = friendId[0];
    } else {
      receiver = friendId;
    }

    const message: IMessage = {
      sender,
      receiver,
      message: messageInputRef.current?.value,
      createdAt: new Date().toISOString(),
      type: "text",
      status: "pending",
      _id: Math.random().toString(),
    };

    // Optimistic UI
    setOptimisticMessages((prev) => [...prev, message]);

    // Send message
    socket.emit("sendMessage", message);

    // Clear input
    messageInputRef.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col flex-1 px-8">
        <div className="flex-1">messages</div>
        <form
          className="w-full flex items-center bg-input/75 rounded-lg border py-1"
          onSubmit={handleSendMessage}
        >
          <Input
            placeholder="Type Something..."
            className="!ring-0 !ring-offset-0 border-0 bg-transparent  p-4 text-[15px]"
            onChange={handleSendButtonStatus}
            ref={messageInputRef}
          />

          <Button
            variant={"ghost"}
            className="hover:bg-primary/5"
            type="submit"
            id="sendButton"
            disabled={true}
          >
            <Send className="text-primary" size={20} />
          </Button>
        </form>
      </div>
    </>
  );
}

// Disable or enable the button based on the input value
const handleSendButtonStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
  const button = document.getElementById("sendButton") as HTMLButtonElement;

  if (e.target.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};
