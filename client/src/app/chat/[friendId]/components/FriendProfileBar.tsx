"use client";
import { useGetChatFriendProfileQuery } from "@/lib/redux/services/chat/chatService";
import { useParams } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { OnlineBadge } from "@/components/ui/online-badge";
import { useEffect } from "react";
import { socket } from "@/socket";
import { OfflineBadge } from "@/components/ui/offline-badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function FriendProfileBar() {
  const { friendId } = useParams();
  const { data: friendProfile, isLoading: isGettingFriendProfile } =
    useGetChatFriendProfileQuery(friendId as string);

  useEffect(() => {
    socket.on;
  }, []);

  return (
    <div className="px-5 pb-4 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {isGettingFriendProfile ? (
          <Skeleton className="h-6 w-40" />
        ) : (
          <p>{friendProfile?.data?.name}</p>
        )}
        <MessageCircleMore size={20} />
      </div>

      <OfflineBadge />
    </div>
  );
}
