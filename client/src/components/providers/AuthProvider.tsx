// "use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useSession } from "next-auth/react";
import { generateAccessToken } from "@/app/actions";
import { login } from "@/lib/redux/features/auth/authSlice";

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

  return <>{children}</>;
}
