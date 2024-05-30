"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/lib/redux/features/friends/friendsSlice";
import { getAvatarUrl } from "@/lib/utils";
import { socket } from "@/socket";
import Link from "next/link";
import React, { useEffect } from "react";
import { UserStatus } from "../../../../types/user.d";

export default function SingleChatFriend({ friend }: { friend: Friend }) {
  const [isActive, setIsActive] = React.useState(
    friend.status === UserStatus.ACTIVE
  );

  useEffect(() => {
    if (friend) {
      socket.on(
        "userStatusUpdated",
        ({ userId, status }: { userId: string; status: UserStatus }) => {
          console.log(userId === friend._id.toString());
          if (userId === friend._id.toString()) {
            setIsActive(status === UserStatus.ACTIVE);
          }
        }
      );
    }

    // Cleanup
    return () => {
      socket.off("userStatus");
    };
  }, []);

  console.log({ isActive });

  return (
    <Link
      href={`chat/${friend._id.toString()}`}
      className="flex  gap-3 items-center hover:bg-gray-100 p-3 rounded-lg"
      key={friend._id.toString()}
    >
      <Avatar className="w-12 h-12 relative overflow-visible" asChild>
        <div>
          <AvatarImage
            src={getAvatarUrl(friend.image)}
            className="rounded-full"
          />

          {isActive && (
            <div
              className={`absolute w-3 h-3 right-0 bottom-0 outline outline-white dark:outline-background bg-green-600 rounded-full`}
            ></div>
          )}
        </div>
      </Avatar>

      <div className="flex flex-col gap-1 text-sm">
        <p>{friend.name}</p>
        <p className="text-xs">Say hi!</p>
      </div>
    </Link>
  );
}
