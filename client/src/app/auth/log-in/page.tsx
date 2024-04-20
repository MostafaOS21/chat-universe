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
import { ApiError } from "@/lib/api-error";
import { PASSWORD_PATTERN_HTML } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LogInPage() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isPending) return;
      setIsPending(true);

      const formData = new FormData(e.currentTarget);

      const password = formData.get("password") as string;

      if (!PASSWORD_PATTERN_HTML.pattern.test(password)) {
        throw new Error(PASSWORD_PATTERN_HTML.title);
      }

      await logIn(formData);

      toast({
        description: "Logged in successfully!",
        variant: "default",
      });

      router.push("/chat");
    } catch (error) {
      toast({
        description: `${ApiError.generate(error).message}`,
        variant: "destructive",
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
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
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
              "Log in"
            )}
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={"secondary"}
              className="flex items-center gap-2"
              disabled={isPending}
            >
              <ImageIcon src="/assets/icons/google.svg" size={25} />
              Google
            </Button>
            <Button
              variant={"secondary"}
              className="flex items-center gap-2"
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
          </div>
        </form>
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
