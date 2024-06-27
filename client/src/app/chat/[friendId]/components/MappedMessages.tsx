"use client";
import { IMessage } from "@/lib/interfaces";
import { CircleAlert, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export default function MappedMessages({ messages }: { messages: IMessage[] }) {
  const { data } = useSession();
  const userId = data?.user?.id as string;

  return (
    <div className="flex-1 flex flex-col justify-end gap-3 py-5 max-h-[100%] bg-red-600 overflow-y-auto">
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} userId={userId} />
      ))}
    </div>
  );
}

const MessageItem = ({
  message,
  userId,
}: {
  message: IMessage;
  userId: string;
}) => {
  const classes = "w-fit rounded-xl p-3";
  let otherClasses;
  let icon;

  /*
    if (message.status === "pending") {
    otherClasses = "animate-pulse flex items-center gap-1";
    icon = <Clock size={15} />;
  }
  */

  if (message.status === "error") {
    // message.status === "error"
    otherClasses = "bg-primary/85 flex items-center gap-1";
    icon = <CircleAlert size={15} className="text-red-600" />;
  }

  if (message.sender === userId) {
    return (
      <div
        className={`bg-primary self-end ${classes} rounded-br-none  ${otherClasses} text-white`}
      >
        {icon}
        {message.message}
      </div>
    );
  } else {
    return (
      <div
        className={`bg-secondary self-start ${classes} rounded-bl-none ${otherClasses}`}
      >
        {icon}
        {message.message}
      </div>
    );
  }
};
