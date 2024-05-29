"use client";
import { useGetChatFriendProfileQuery } from "@/lib/redux/services/chat/chatService";
import { useParams } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { OnlineBadge } from "@/components/ui/online-badge";
import { useEffect } from "react";
import { socket } from "@/socket";
import { OfflineBadge } from "@/components/ui/offline-badge";

export default function FriendProfileBar() {
  const { friendId } = useParams();
  const { data: friendProfile } = useGetChatFriendProfileQuery(
    friendId as string
  );

  useEffect(() => {
    socket.on;
  }, []);

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-3">
        <p>{friendProfile?.data?.name}</p>
        <MessageCircleMore size={20} />
      </div>

      {/* <OnlineBadge /> */}
      <OfflineBadge />
    </div>
  );
}
