"use client";
import { ShowMoreIcon } from "@/components/ui/show-more-icon";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-error";
import { api } from "@/features/api";
import { ApiResponse } from "@/lib/interfaces";
import { PROFILE_ROUTES } from "@/lib/constants";
import ProfileBarContent from "./ProfileBarContent";

export default function ProfileBar() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const extraMenuRef = useRef<HTMLUListElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

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
    console.log("HEY");
    const conversationList = document.getElementById("conversationList");

    if (extraMenuRef.current?.getAttribute("aria-expanded") === "true") {
      extraMenuRef.current?.classList?.add?.("-translate-x-[450px]");
      extraMenuRef.current?.setAttribute?.("aria-expanded", "false");

      conversationList?.classList?.remove?.("translate-x-[450px]");
    } else {
      extraMenuRef.current?.classList?.remove?.("-translate-x-[450px]");
      extraMenuRef.current?.setAttribute?.("aria-expanded", "true");

      conversationList?.classList?.add?.("translate-x-[450px]");
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const res = await api.delete("/auth/sign-out");
      const data: ApiResponse = await res.data;

      toast({
        description: data.message,
        duration: 2000,
      });

      // TODO: Sign out user
      router.push("/");
    } catch (error) {
      console.log(error);
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
        <ProfileBarContent />

        <ShowMoreIcon />
      </Button>

      <menu
        className={`absolute w-full h-full bg-background transition-transform duration-700 ease-in-out -translate-x-[450px]`}
        ref={extraMenuRef}
        aria-expanded={false}
      >
        {PROFILE_ROUTES.map((route) => (
          <li key={route.label}>
            <Button
              className="w-full flex justify-start gap-2 mb-2"
              onClick={() => router.push(route.href)}
              variant={"secondary"}
            >
              <route.icon size={20} /> {route.label}
            </Button>
          </li>
        ))}

        <li>
          <Button
            className="w-full flex justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={20} /> Sign out
          </Button>
        </li>
      </menu>
    </>
  );
}
