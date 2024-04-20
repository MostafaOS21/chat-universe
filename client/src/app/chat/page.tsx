import React from "react";
import { redirect } from "next/navigation";
import ProfileBar from "./components/ProfileBar";
import ChatConversation from "./components/ChatConversation";
import { Separator } from "@/components/ui/separator";
import SearchUser from "./components/SearchUser";

export default async function ChatPage() {
  return (
    <>
      {/* Avatar and chats */}
      <aside className="py-5 relative">
        {/* <ProfileBar user={user} /> */}
        <SearchUser />
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
