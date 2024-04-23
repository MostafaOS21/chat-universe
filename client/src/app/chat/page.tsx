import React from "react";
import ProfileBar from "./components/ProfileBar";
import ChatConversation from "./components/ChatConversation";
import { Separator } from "@/components/ui/separator";
import ConversationsList from "./components/ConversationsList";

export default async function ChatPage() {
  return (
    <>
      {/* Avatar and chats */}
      <aside className="py-5 relative">
        <ProfileBar />
        <ConversationsList />
      </aside>

      <Separator orientation="vertical" />

      {/* Chat */}
      <div className="py-5 min-h-screen">
        <ChatConversation />
      </div>

      <Separator orientation="vertical" />

      {/* Chat Links and media */}
      <div className="py-5"></div>
    </>
  );
}
