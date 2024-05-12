"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { ApiResponse, IRequestFriend } from "@/lib/interfaces";
import { getAvatarUrl, sliceString } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, useOptimistic, useRef } from "react";
import { UserPlus, UserRoundX, UserRoundCheck } from "lucide-react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useLazyGetSearchUsersQuery } from "@/lib/redux/services/users/usersService";

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

const UserItem = ({
  user,
  setUsers,
  setOptimisticUsers,
}: {
  user: IRequestFriend;
  setUsers: React.Dispatch<React.SetStateAction<IRequestFriend[]>>;
  setOptimisticUsers: React.Dispatch<React.SetStateAction<IRequestFriend[]>>;
}) => {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const iconSize = 18;
  const buttonStyles = "flex items-center gap-2";
  let button;

  // Add request
  const addRequest = async (user: IRequestFriend) => {
    try {
      setIsPending(true);

      const formattedUser: IRequestFriend = {
        ...user,
        status: "pending",
      };

      setOptimisticUsers((prev) => {
        const index = prev.findIndex((u) => u._id === user._id);
        const newUsers = [...prev];
        newUsers[index] = formattedUser;
        return newUsers;
      });

      const res = await api.post(`/friends-requests/send/${user._id}`);
      const data: ApiResponse<IRequestFriend> = await res.data;

      setUsers((prev) => {
        const index = prev.findIndex((u) => u._id === user._id);
        const newUsers = [...prev];
        if (data.data) newUsers[index] = data.data;
        return newUsers;
      });

      toast({
        description: data.message,
      });
    } catch (error) {
      toast({
        description: ApiError.generate(error).message,
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const cancelRequest = async (user: IRequestFriend) => {
    try {
      setIsPending(true);
      const res = await api.delete(`/friends-requests/cancel/${user._id}`);
      const data: ApiResponse<IRequestFriend> = await res.data;

      setUsers((prev) => {
        const index = prev.findIndex((u) => u._id === user._id);
        const newUsers = [...prev];
        if (data.data) newUsers[index] = data.data;
        return newUsers;
      });

      toast({
        description: data.message,
      });
    } catch (error) {
      toast({
        description: ApiError.generate(error).message,
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  switch (user.status) {
    case "pending":
      button = (
        <Button
          className={buttonStyles}
          variant={"secondary"}
          onClick={() => cancelRequest(user)}
          disabled={isPending}
        >
          <UserRoundX size={iconSize} /> Cancel
        </Button>
      );
      break;

    case "accepted":
      button = (
        <Button
          className={buttonStyles}
          variant={"outline"}
          disabled={isPending}
        >
          <UserRoundCheck size={iconSize} /> Friends
        </Button>
      );
      break;

    default:
      button = (
        <Button
          className={buttonStyles}
          onClick={() => addRequest(user)}
          disabled={isPending}
        >
          <UserPlus size={iconSize} /> Request
        </Button>
      );
  }

  return (
    <div className={`flex items-center gap-3 mb-5 px-2`}>
      <div>
        <Avatar>
          <AvatarImage
            src={getAvatarUrl(user.image)}
            alt={user.name}
            className="w-[40px] h-[40px]"
          />
        </Avatar>
      </div>
      <div className="grid grid-cols-[2fr_1fr] flex-1">
        <div>
          <p>{sliceString(user.name)}</p>
          <p className="text-sm text-gray-600">
            @{sliceString(user.username, 15)}
          </p>
        </div>
        {/* Friend's Button */}
        {button}
      </div>
    </div>
  );
};

export default function UsersList({ search }: { search: string }) {
  const [users, setUsers] = useState<IRequestFriend[]>([]);
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(users);
  const { toast } = useToast();
  const usersListRef = useRef<HTMLDivElement>(null);
  const { page, setPage } = useInfiniteScroll({
    refTarget: usersListRef,
    currentPage: 1,
  });
  const [hasMore, setHasMore] = useState(true);
  // RTK Query method
  const [getSearchUsers] = useLazyGetSearchUsersQuery();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getSearchUsers({ search });
      const { data, isError, error } = res;
      console.log({ data, isError, error });

      if (data?.data) {
        setUsers(data.data);
      } else if (isError) {
        toast({
          description: ApiError.generate(error).message,
        });
      }
    };

    if (search) {
      fetchUsers();
    } else {
      setUsers([]);
    }

    setPage(0);
  }, [search]);

  useEffect(() => {
    const fetchMoreUsers = async () => {
      try {
        const res = await api.get(`/auth/search/${search}?page=${page}`);
        const data: ApiResponse<IRequestFriend[]> = await res.data;
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

  return (
    <div className="h-[300px] overflow-y-auto" ref={usersListRef}>
      {optimisticUsers?.map((user, i) => (
        <UserItem
          key={i}
          user={user}
          setUsers={setUsers}
          setOptimisticUsers={setOptimisticUsers}
        />
      ))}
      {optimisticUsers?.length && hasMore ? <SkeletonUser /> : null}
    </div>
  );
}
