import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/log-in");
  }

  return (
    <section className="grid grid-cols-[250px_2.2px_1fr_2.2px_350px] gap-2 py-0 px-5">
      {children}
    </section>
  );
}
