import { FriendShipStatus, IRequestFriend } from "@/lib/interfaces";
import React from "react";
import { Dispatch, SetStateAction, startTransition, useEffect } from "react";

interface IProps {
  id: string;
  status: FriendShipStatus;
  setOptimisticUsers: Dispatch<SetStateAction<IRequestFriend[]>>;
  setUsers: Dispatch<SetStateAction<IRequestFriend[]>>;
  isLoading: boolean;
}

export default function useUpdateUserStates({
  id,
  setOptimisticUsers,
  status,
  setUsers,
  isLoading,
}: IProps) {
  const [isSuccess, setIsSuccess] = React.useState(false);

  useEffect(() => {
    // if (isLoading) {
    //   // Optimistic update
    //   startTransition(() => {
    //     setOptimisticUsers((prev) => {
    //       const index = prev.findIndex((u) => u._id === id);
    //       let newUsers = [...prev];
    //       newUsers[index] = { ...newUsers[index], status: status };
    //       return newUsers;
    //     });
    //   });
    // }
    // if (isSuccess) {
    //   setUsers((prev) => {
    //     const index = prev.findIndex((u) => u._id === id);
    //     let newUsers = [...prev];
    //     newUsers[index] = { ...newUsers[index], status: status };
    //     return newUsers;
    //   });
    // }
  }, [isLoading]);

  return { setIsSuccess };
}
