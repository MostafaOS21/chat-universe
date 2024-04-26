"use client";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/lib/constants";
import { isAuthed } from "@/lib/redux/features/authSlice";
import { useAppSelector } from "@/lib/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RoutesProtectProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAuth = useAppSelector(isAuthed);
  const router = useRouter();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some(
      (route) => route === pathname.toLowerCase()
    );

    const isProtectedRoute = PROTECTED_ROUTES.some(
      (route) => route === pathname.toLowerCase()
    );

    if (isAuthRoute && isAuth) {
      router.push("/chat");
    }

    if (isProtectedRoute && !isAuth) {
      router.push("/auth/log-in");
    }
  }, [pathname, isAuth]);

  return children;
}
