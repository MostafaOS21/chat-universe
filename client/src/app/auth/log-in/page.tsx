"use client";
import { logIn } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "@/components/ui/get-icon";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { PASSWORD_PATTERN_HTML } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LogInPage() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isPending) return;
      setIsPending(true);

      const formData = new FormData(e.currentTarget);

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!PASSWORD_PATTERN_HTML.pattern.test(password)) {
        throw new Error(PASSWORD_PATTERN_HTML.title);
      }

      const data = {
        email,
        password,
      };

      await logIn(data);

      toast({
        description: "Logged in successfully!",
      });

      window.location.href = "/";
    } catch (error) {
      toast({
        description:
          "Error logging in! Please ensure your credentials are correct",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">Log in</CardTitle>
        <CardDescription>Log in now!</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            disabled={isPending}
            defaultValue={"mostafa.osama@gmail.com"}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
            disabled={isPending}
            defaultValue={"Mostafa@1952002"}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <form action={process.env.NEXT_PUBLIC_GOOGLE_CALLBACK}>
            <Button
              variant={"secondary"}
              className="flex items-center gap-2 w-full"
              disabled={isPending}
            >
              <ImageIcon src="/assets/icons/google.svg" size={25} />
              Google
            </Button>
          </form>
          <form action="">
            <Button
              variant={"secondary"}
              className="flex items-center gap-2 w-full"
              disabled={isPending}
            >
              <ImageIcon
                src="/assets/icons/github.svg"
                size={25}
                className="dark:hidden"
              />
              <ImageIcon
                src="/assets/icons/github-light.svg"
                size={25}
                className="hidden dark:block"
              />
              Github
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          Already have an account?{" "}
          <Button variant={"link"} asChild className="p-0">
            <Link href={"/auth/sign-up"}>Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
