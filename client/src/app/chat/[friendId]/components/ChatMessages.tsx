"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMessage } from "@/lib/interfaces";
import { useGetChatQuery } from "@/lib/redux/services/chat/chatService";
import { socket } from "@/socket";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import MappedMessages from "./MappedMessages";

export default function ChatMessages() {
  const { friendId } = useParams();
  const {
    data: chatMessages,
    isLoading: isGettingChat,
    isSuccess,
  } = useGetChatQuery(friendId as string);
  const userAuth = useSession();
  const messageInputRef = useRef<HTMLInputElement>(null);
  // Loading state
  const [loading, setLoading] = useState(false);
  // Messages States
  const [messages, setMessages] = useState<IMessage[]>([]);

  // set messages
  useEffect(() => {
    if (chatMessages?.data?.messages) {
      setMessages(chatMessages.data.messages);
    }
  }, [chatMessages]);

  // Listen for messages
  useEffect(() => {
    // Empty the input & setLoading to false
    const emptyInput = () => {
      // Clear input
      if (messageInputRef.current) {
        messageInputRef.current.value = "";
      }
      setLoading(false);
    };

    // success => make the message status success
    socket.on("receiveMessage", (message: IMessage) => {
      setMessages((prev) => [...prev, { ...message, status: "success" }]);
      emptyInput();
    });

    // error => make the message status error
    socket.on("receiveMessage:Error", (message: IMessage) => {
      setMessages((prev) => [...prev, { ...message, status: "error" }]);
      emptyInput();
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("receiveMessage:Error");
    };
  }, []);

  // Send message
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sender = userAuth.data?.user?.id;

    const messageContent = messageInputRef.current?.value;

    if (!messageContent) return;

    if (!messageContent || !sender || !friendId) return;
    let receiver: string;

    // check if the friendId is an array
    if (Array.isArray(friendId)) {
      receiver = friendId[0];
    } else {
      receiver = friendId;
    }

    const message: Omit<IMessage, "_id" | "status"> = {
      sender,
      receiver,
      message: messageInputRef.current?.value,
      createdAt: new Date().toISOString(),
      type: "text",
    };

    // Set loading to true
    setLoading(true);

    // Send message
    socket.emit("sendMessage", message);
  };

  return (
    <div className="flex flex-col flex-1 px-8">
      <MappedMessages messages={messages} />
      <form
        className="w-full flex items-center bg-input/75 rounded-lg border py-1"
        onSubmit={handleSendMessage}
      >
        <Input
          placeholder="Type Something..."
          className="!ring-0 !ring-offset-0 border-0 bg-transparent  p-4 text-[15px]"
          ref={messageInputRef}
          disabled={isGettingChat || loading}
        />

        <Button
          variant={"ghost"}
          className="hover:bg-primary/5"
          type="submit"
          id="sendButton"
          disabled={isGettingChat || loading}
        >
          <Send className="text-primary" size={20} />
        </Button>
      </form>
    </div>
  );
}
