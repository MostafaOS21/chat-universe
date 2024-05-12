"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OnlineBadge } from "@/components/ui/online-badge";
import { getAvatarUrl } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React from "react";

export default function ProfileBarContent() {
  const session = useSession();
  const user = session?.data?.user;

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
