import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your account",
};

export default function LogInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
