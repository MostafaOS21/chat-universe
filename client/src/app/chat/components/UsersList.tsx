"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/interfaces";
import { IUser, setUser } from "@/lib/redux/features/authSlice";
import { getAvatarUrl } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  useEffect,
  useState,
  useOptimistic,
  useRef,
  startTransition,
} from "react";

const SkeletonUser = () => {
  return (
    <div className="flex items-center gap-3 mb-5 px-2">
      <Skeleton className="w-[40px] h-[40px] rounded-lg" />
      <div className="flex-1 flex items-center">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-[100px] h-[15px] rounded-lg" />
          <Skeleton className="w-[100px] h-[10px] rounded-lg" />
        </div>
        <Skeleton className="w-[90px] h-[40px] rounded-lg" />
      </div>
    </div>
  );
};

export default function UsersList({ search }: { search: string }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(users);
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const usersListRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/auth/search/${search}`);
        const data: ApiResponse<IUser[]> = await res.data;

        if (data.data) {
          setUsers(data.data);
        }
      } catch (error: any) {
        toast({
          description: ApiError.generate(error).message,
          variant: "destructive",
        });
      }
    };

    if (search) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [search]);

  useEffect(() => {
    const fetchMoreUsers = async () => {
      try {
        const res = await api.get(`/auth/search/${search}?page=${page}`);
        const data: ApiResponse<IUser[]> = await res.data;
        const users = data?.data ? data?.data : [];

        if (!users.length) {
          setHasMore(false);
        }

        setUsers((prev) => [...prev, ...users]);
      } catch (error) {
        toast({
          description: ApiError.generate(error).message,
          variant: "destructive",
        });
      }
    };

    if (page > 1 && search) {
      fetchMoreUsers();
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scrollHeight = target.scrollHeight;
      const scrollTop = target.scrollTop;
      const clientHeight = target.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };
    usersListRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      usersListRef.current?.removeEventListener("scroll", handleScroll);
      setUsers([]);
    };
  }, []);

  return (
    <div className="h-[300px] overflow-y-auto" ref={usersListRef}>
      {optimisticUsers?.map((user) =>
        user.username ? (
          <div key={user._id} className="flex items-center gap-3 mb-5 px-2">
            <div>
              <Avatar>
                <AvatarImage
                  src={getAvatarUrl(user.image)}
                  alt={user.name}
                  className="w-[40px] h-[40px]"
                />
              </Avatar>
            </div>
            <div className="flex items-center flex-1">
              <div className="flex-1">
                <p>{user.name}</p>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
              <Button>Request</Button>
            </div>
          </div>
        ) : (
          <SkeletonUser key={user._id} />
        )
      )}

      {optimisticUsers?.length && hasMore ? <SkeletonUser /> : null}
    </div>
  );
}
