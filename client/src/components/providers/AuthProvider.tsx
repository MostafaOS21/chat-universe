// "use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useSession } from "next-auth/react";
import { generateAccessToken } from "@/app/actions";
import { login } from "@/lib/redux/features/auth/authSlice";
import { Loader } from "lucide-react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const session = useSession();

  useEffect(() => {
    const getAccessToken = async () => {
      const result = await generateAccessToken();

      if (result) dispatch(login(result));
    };

    if (session?.data?.user?.id) {
      getAccessToken();
    }
  }, [session.status]);

  return (
    <>
      <span
        id="overlay"
        className="w-0 h-0 transition-opacity opacity-0 fixed left-0 top-0 z-[9999999] bg-white grid place-content-center"
      >
        <Loader className="animate-spin text-primary" size={28} />
      </span>
      {children}
    </>
  );
}
