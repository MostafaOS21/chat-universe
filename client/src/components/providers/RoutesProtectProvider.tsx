"use client";
import { AUTH_ROUTES } from "@/lib/constants";
import { useAppSelector } from "@/lib/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function RoutesProtectProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAuth = useAppSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      route.includes(pathname.toLowerCase())
    );

    if (isAuthRoute && isAuth) {
      router.push("/chat");
    }
  }, [pathname, isAuth]);

  return children;
}
