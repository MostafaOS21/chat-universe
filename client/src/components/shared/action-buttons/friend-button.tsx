"use client";

import { Button } from "@/components/ui/button";
import { buttonStyles, iconSize } from "@/lib/constants";
import { IUserButtonsProps } from "@/lib/interfaces";
import { useUnfriendMutation } from "@/lib/redux/services/requests/requestsService";
import { UserCheck, UserRoundX } from "lucide-react";
import { useState } from "react";

export default function FriendButton({
  isPending,
  id,
  setters,
}: IUserButtonsProps) {
  const [unfriend] = useUnfriendMutation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleUnfriend = async () => {
    try {
      setters.setIsPending(true);

      await unfriend(id);
    } catch (error) {
    } finally {
      setters.setIsPending(false);
    }
  };

  const content = isHovered ? (
    <>
      <UserRoundX size={iconSize} /> Unfriend
    </>
  ) : (
    <>
      <UserCheck size={iconSize} /> Friends
    </>
  );

  return (
    <Button
      className={buttonStyles}
      variant={"outline"}
      onClick={handleUnfriend}
      disabled={isPending}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {content}
    </Button>
  );
}
