import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/");
  }

  return (
    <>
      <section
        className="relative h-screen grid place-items-center"
        style={{
          backgroundImage: "url('/assets/images/ooorganize.svg')",
          backgroundSize: "cover",
        }}
      >
        {children}
      </section>
    </>
  );
}
