import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings page",
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return children;
}
