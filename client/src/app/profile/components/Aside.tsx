"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OnlineBadge } from "@/components/ui/online-badge";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { PROFILE_ROUTES } from "@/lib/constants";
import { ApiResponse } from "@/lib/interfaces";
import { logOut, selectUser } from "@/lib/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Aside() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const res = await api.delete("/auth/sign-out");
      const data: ApiResponse = await res.data;

      toast({
        description: data.message,
        duration: 2000,
      });

      dispatch(logOut());

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
    <aside className="py-5 min-h-screen">
      <Button
        variant={"secondary"}
        className="flex gap-3 relative py-8 !rounded-xl mb-3 w-full justify-between"
      >
        <Link href={"/chat"} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>

          <div>
            <h4>{user.name}</h4>
            <OnlineBadge />
          </div>
        </Link>
      </Button>

      <menu className={`w-full h-full bg-background`} aria-expanded={true}>
        {PROFILE_ROUTES.map((route) => (
          <li key={route.label}>
            <Button
              className="w-full flex justify-start gap-2 mb-2"
              onClick={() => router.push(route.href)}
              variant={pathname === route.href ? "secondary" : "ghost"}
            >
              <route.icon size={20} /> {route.label}
            </Button>
          </li>
        ))}

        <li className="mt-auto">
          <Button
            className="w-full flex justify-start gap-2"
            onClick={handleSignOut}
            variant={"destructive"}
          >
            <LogOut size={20} /> Sign out
          </Button>
        </li>
      </menu>
    </aside>
  );
}
