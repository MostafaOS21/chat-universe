"use client";
import { useGetChatFriendProfileQuery } from "@/lib/redux/services/chat/chatService";
import { useParams } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { OnlineBadge } from "@/components/ui/online-badge";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { OfflineBadge } from "@/components/ui/offline-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStatus } from "../../../../../types/user.d";

export default function FriendProfileBar() {
  const { friendId } = useParams();
  const { data: friendProfile, isLoading: isGettingFriendProfile } =
    useGetChatFriendProfileQuery(friendId as string);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    socket.on(
      "userStatusUpdated",
      ({ userId, status }: { userId: string; status: UserStatus }) => {
        if (userId === friendId) {
          setIsActive(status === UserStatus.ACTIVE);
        }
      }
    );

    // Cleanup
    return () => {
      socket.off("userStatus");
    };
  }, []);

  useEffect(() => {
    setIsActive(friendProfile?.data?.status === UserStatus.ACTIVE);
  }, [friendProfile?.data?.status]);

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

      {isActive ? <OnlineBadge /> : <OfflineBadge />}
    </div>
  );
}
