"use client";
import Link from "next/link";
import { Button } from "./button";
import { useAppSelector } from "@/lib/redux/hooks";
import { isAuthed } from "@/lib/redux/features/authSlice";

export const MainHomeButton = () => {
  const isAuth = useAppSelector(isAuthed);

  const linkContent = isAuth ? "/chat" : "/auth/sign-up";
  const buttonText = isAuth
    ? "Start Chatting Now!"
    : "Create Your Account Now!";

  return (
    <Button asChild size={"lg"}>
      <Link href={linkContent}>{buttonText}</Link>
    </Button>
  );
};
