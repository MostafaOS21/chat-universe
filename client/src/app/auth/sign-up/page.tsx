"use client";
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
import { api } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { PASSWORD_PATTERN_HTML } from "@/lib/constants";
import { ApiResponse } from "@/lib/interfaces";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isPending) return;

      setIsPending(true);

      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      // Validate password
      if (!PASSWORD_PATTERN_HTML.pattern.test(password)) {
        throw new Error(PASSWORD_PATTERN_HTML.title);
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Call the API
      const res = await api.post("/auth/sign-up", {
        name,
        email,
        password,
        confirmPassword,
      });

      const data: ApiResponse<string> = await res.data;

      toast({
        description: data.message,
        duration: 3000,
      });

      router.push(`/auth/log-in?email=${email}`);
    } catch (error) {
      toast({
        description: ApiError.generate(error).message || "User not found.",
        duration: 3000,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Start your chat now!</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Full Name"
            type="text"
            name="name"
            required
            maxLength={50}
            disabled={isPending}
          />

          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            disabled={isPending}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign up"
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
            <Link href={"/auth/log-in"}>Log in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
