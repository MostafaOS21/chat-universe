import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ProfileBar from "./components/ProfileBar";
import ConversationsList from "./components/ConversationsList";
import { Separator } from "@/components/ui/separator";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/log-in");
  }

  return (
    <section className="grid grid-cols-[1fr_2.2px_3fr_2.2px_1fr] py-0 px-3">
      {/* Avatar and chats */}
      <aside className="py-5 px-2 relative overflow-hidden">
        <ProfileBar />
        <ConversationsList />
      </aside>

      <Separator orientation="vertical" />

      {/* Chat */}
      <div className="py-5 min-h-screen">{children}</div>

      <Separator orientation="vertical" />

      {/* Chat Links and media */}
      <div className="py-5"></div>
    </section>
  );
}
