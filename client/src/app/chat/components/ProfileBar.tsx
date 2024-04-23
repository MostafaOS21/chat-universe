"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAvatarUrl } from "@/lib/utils";
import { OnlineBadge } from "@/components/ui/online-badge";
import { ShowMoreIcon } from "@/components/ui/show-more-icon";
import { Button } from "@/components/ui/button";
import { Bolt, LogOut } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { signOutAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-error";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux/features/authSlice";

// TODO: Implement ProfileBar component
const profileExtraMenu = [
  {
    icon: Bolt,
    label: "Settings",
  },
];

export default function ProfileBar() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const extraMenuRef = useRef<HTMLUListElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        extraMenuRef.current === event.target ||
        buttonRef.current?.contains(event.target as Node) ||
        buttonRef.current === event.target
      ) {
        return;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle is opened
  const handleIsOpened = () => {
    // "translate-x-0" : "-translate-x-[450px]"
    extraMenuRef.current?.classList?.toggle?.("-translate-x-[450px]");
    extraMenuRef.current?.setAttribute?.("aria-expanded", "true");
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOutAction();

      toast({
        description: "Signed out successfully!",
        duration: 2000,
      });

      router.push("/");
    } catch (error) {
      toast({
        description: ApiError.generate(error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant={"secondary"}
        className="flex gap-3 relative py-8 !rounded-xl mb-3 w-full justify-between"
        ref={buttonRef}
        onClick={handleIsOpened}
      >
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>

          <div>
            <h4>{user.name}</h4>
            <OnlineBadge />
          </div>
        </div>

        <ShowMoreIcon />
      </Button>

      <menu
        className={`absolute w-full h-full bg-background transition-transform duration-700 ease-in-out -translate-x-[450px]`}
        ref={extraMenuRef}
        aria-expanded={false}
      >
        <li>
          <Button
            className="w-full flex justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut /> Sign out
          </Button>
        </li>
      </menu>
    </>
  );
}
