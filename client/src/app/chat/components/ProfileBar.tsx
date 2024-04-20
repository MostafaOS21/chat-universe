"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAvatarUrl } from "@/lib/utils";
import { OnlineBadge } from "@/components/ui/online-badge";
import { ShowMoreIcon } from "@/components/ui/show-more-icon";
import { Button } from "@/components/ui/button";
import { Bolt, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOutAction } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-error";

// TODO: Implement ProfileBar component
const profileExtraMenu = [
  {
    icon: Bolt,
    label: "Settings",
  },
];

export default function ProfileBar({ user }: { user: any }) {
  const [isOpened, setIsOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const extraMenuRef = useRef<HTMLUListElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        extraMenuRef.current === event.target ||
        buttonRef.current?.contains(event.target as Node) ||
        buttonRef.current === event.target
      ) {
        return;
      }
      setIsOpened(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={getAvatarUrl(user.image)} alt={user.name} />
          </Avatar>

          <div>
            <h4>{user.name}</h4>
            <OnlineBadge />
          </div>
        </div>

        <ShowMoreIcon />
      </Button>

      <ul
        className={`absolute w-full h-full bg-background transition-transform duration-700 ease-in-out ${
          isOpened ? "translate-x-0" : "-translate-x-[450px]"
        }`}
        ref={extraMenuRef}
      >
        <li>
          <Button
            className="w-full flex justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut /> Sign out
          </Button>
        </li>
      </ul>
    </>
  );
}
