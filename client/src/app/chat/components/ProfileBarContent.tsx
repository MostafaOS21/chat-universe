"use client";
import { socket } from "@/socket";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OnlineBadge } from "@/components/ui/online-badge";
import { getAvatarUrl } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ProfileBarContent() {
  const session = useSession();
  const user = session?.data?.user;
  const [isOnline, setIsOnline] = useState(false);

  // Handle Socket
  useEffect(() => {
    // make user online + send user data

    if (user) {
      socket.emit("updateUserStatus", {
        userId: user.id,
        status: true,
      });
      // updateUserStatus
      socket.on("updateUserStatus", (data) => {
        if (data.userId === user.id) {
          setIsOnline(data.status);
        }
      });
    }

    // On disconnection

    return () => {
      socket.off("user:online");
    };
  }, [user]);

  console.log({ isOnline });

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={getAvatarUrl(user?.image || "")} alt={user?.name} />
      </Avatar>

      <div>
        <h4>{user?.name || ""}</h4>
        <OnlineBadge />
      </div>
    </div>
  );
}
