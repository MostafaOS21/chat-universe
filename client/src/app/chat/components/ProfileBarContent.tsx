"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OnlineBadge } from "@/components/ui/online-badge";
import { getAvatarUrl } from "@/lib/utils";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { UserStatus } from "../../../../types/user.d";

export default function ProfileBarContent() {
  const session = useSession();
  const user = session?.data?.user;

  useEffect(() => {
    // Emit user status
    socket.emit("updateUserStatus", {
      userId: user?.id,
      status: UserStatus.ACTIVE,
    });

    // Emit user status on disconnect
    socket.on("disconnect", () => {
      socket.emit("updateUserStatus", {
        userId: user?.id,
        status: UserStatus.INACTIVE,
      });
    });

    // Cleanup
    return () => {
      socket.off("userStatus");
      socket.off("updateUserStatus");
    };
  }, [user]);

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
