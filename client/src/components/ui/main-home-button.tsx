import Link from "next/link";
import { Button } from "./button";
import { auth } from "@/auth";

export const MainHomeButton = async () => {
  const session = await auth();
  const isAuthed = session?.user.id ? true : false;

  // Create 10 seconds delay to show the loading spinner

  const linkContent = isAuthed ? "/chat" : "/auth/sign-up";
  const buttonText = isAuthed
    ? "Start Chatting Now!"
    : "Create Your Account Now!";

  const logInButton = !isAuthed && (
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
