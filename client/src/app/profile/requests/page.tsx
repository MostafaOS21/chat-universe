import { Metadata } from "next";
import React from "react";
import RequestsTabsList from "./components/RequestsTabsList";

export const metadata: Metadata = {
  title: "Requests",
  description: "Handle your friend requests",
};

export default function RequestsPage() {
  return <RequestsTabsList />;
}
