import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/components/providers/StoreProvider";
import { SessionProvider } from "next-auth/react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chat Universe",
  description: "Start chatting with people from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <SessionProvider>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              // disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
