"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/lib/api-error";
import { IRequestFriend } from "@/lib/interfaces";
import { getAvatarUrl, sliceString } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useLazyGetSearchUsersQuery } from "@/lib/redux/services/users/usersService";
import AcceptReceivedRequest from "@/components/shared/action-buttons/accept-received-request";
import SendRequestButton from "@/components/shared/action-buttons/send-request-button";
import CancelSentRequestButton from "@/components/shared/action-buttons/cancel-sent-request-button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  emptySearchUsers,
  selectUsers,
} from "@/lib/redux/features/search-users/searchUsersSlice";
import FriendButton from "@/components/shared/action-buttons/friend-button";
import RejectReceivedRequest from "@/components/shared/action-buttons/reject-received-request";

export default function UsersList({ search }: { search: string }) {
  const { toast } = useToast();
  const usersListRef = useRef<HTMLDivElement>(null);
  const { page, setPage } = useInfiniteScroll({
    refTarget: usersListRef,
    currentPage: 1,
  });
  const [hasMore, setHasMore] = useState(true);
  // RTK Query method
  const [getSearchUsers, { isLoading: isGettingUsers }] =
    useLazyGetSearchUsersQuery();
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(emptySearchUsers());
        setPage(1);
        await getSearchUsers({ search, page: 1 });
      } catch (error) {
        toast({
          description: ApiError.generate(error).message,
          variant: "destructive",
        });
        setHasMore(false);
      }
    };

    if (search) {
      fetchUsers();
    }

    setPage(0);
  }, [search]);

  useEffect(() => {
    const fetchMoreUsers = async () => {
      try {
        const { data } = await getSearchUsers({ search, page });
      } catch (error) {
        toast({
          description: ApiError.generate(error).message,
          variant: "destructive",
        });
        setHasMore(false);
      }
    };

    if (page > 1 && search) {
      fetchMoreUsers();
    }
  }, [page]);

  let content;

  if ((users?.length === 0 || !users) && !isGettingUsers) {
    content = <p className="text-center text-gray-500">No users found</p>;
  } else {
    content = (
      <>
        {users?.map((user, i) => (
          <UserItem key={i} user={user} />
        ))}
        {hasMore ? <SkeletonUser /> : null}
      </>
    );
  }

  return (
    <div className="h-[300px] overflow-y-auto" ref={usersListRef}>
      {content}
    </div>
  );
}

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

const UserItem = ({ user }: { user: IRequestFriend }) => {
  const [isPending, setIsPending] = useState(false);
  const setters = { setIsPending };
  let button;

  switch (user.status) {
    case "pending":
      switch (user.isSender) {
        case true:
          button = (
            <CancelSentRequestButton
              id={user._id}
              isPending={isPending}
              setters={setters}
            />
          );
          break;
        default:
          button = (
            <div className="flex items-center gap-2">
              <RejectReceivedRequest
                id={user._id}
                isPending={isPending}
                setters={setters}
              />

              <AcceptReceivedRequest
                id={user._id}
                isPending={isPending}
                setters={setters}
              />
            </div>
          );
      }
      break;

    case "accepted":
      button = (
        <FriendButton id={user._id} isPending={isPending} setters={setters} />
      );
      break;

    case "rejected":
      switch (user.isRejectedOne) {
        case true:
          button = null;
          break;

        default:
          button = (
            <SendRequestButton
              id={user._id}
              isPending={isPending}
              setters={setters}
            />
          );
      }

      break;

    default:
      button = (
        <SendRequestButton
          id={user._id}
          isPending={isPending}
          setters={setters}
        />
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
