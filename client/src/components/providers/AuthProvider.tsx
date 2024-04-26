"use client";
import { api } from "@/features/api";
import { ReactNode, useEffect, useRef } from "react";
import { useToast } from "../ui/use-toast";
import { ApiError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/interfaces";
import { IUser, logIn, logOut } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Loader2 } from "lucide-react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let overlayTimeout: NodeJS.Timeout;

    const showOverlay = () => {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    };

    const hideOverlay = () => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "0";
        overlayTimeout = setTimeout(() => {
          overlayRef.current!.style.display = "none";
          document.body.style.height = "auto";
          document.body.style.overflow = "auto";
        }, 800);
      }
    };

    const refreshAuth = async () => {
      try {
        showOverlay();

        const res = await api.post("/auth/refresh");

        const data: ApiResponse<IUser> = await res.data;
        const user = data.data;

        if (!user) {
          throw new Error("User not found");
        }

        dispatch(logIn({ user }));
      } catch (error) {
        const { message, status } = ApiError.generate(error);

        dispatch(logOut());
        if (status !== 400)
          toast({
            description: message,
            variant: "destructive",
          });
      } finally {
        hideOverlay();
      }
    };

    refreshAuth();

    return () => {
      clearTimeout(overlayTimeout);
    };
  }, []);

  return (
    <>
      <span
        className="fixed left-0 top-0 w-screen h-screen bg-background z-[999999999] grid place-items-center transition-opacity delay-700"
        ref={overlayRef}
      >
        <Loader2 className="animate-spin text-primary" size={38} />
      </span>
      {children}
    </>
  );
}
