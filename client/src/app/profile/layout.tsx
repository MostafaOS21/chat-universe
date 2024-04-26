import { Separator } from "@/components/ui/separator";
import React from "react";
import Aside from "./components/Aside";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[250px_2.2px_1fr] gap-2 py-0 px-5">
      <Aside />
      <Separator orientation="vertical" />
      <div className="py-5 px-5">{children}</div>
    </section>
  );
}
