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

  const logInButton = !isAuth && (
    <div className="text-sm">
      Or
      <Button variant={"link"} asChild>
        <Link href={"/auth/log-in"}>Log in to your account</Link>
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <Button asChild size={"lg"}>
        <Link href={linkContent}>{buttonText}</Link>
      </Button>

      {logInButton}
    </div>
  );
};
