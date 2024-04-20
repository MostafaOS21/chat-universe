import { ReactNode } from "react";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-[250px_2.2px_1fr_2.2px_350px] gap-2 py-0 px-5">
      {children}
    </section>
  );
}
