import React, {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
} from "react";
import { Button } from "../../ui/button";
import { useAcceptReceivedRequestMutation } from "@/lib/redux/services/requests/requestsService";
import { UserCheck } from "lucide-react";
import { buttonStyles, iconSize } from "@/lib/constants";
import { IRequestFriend, IUserButtonsProps } from "@/lib/interfaces";
import useUpdateUserStates from "@/hooks/useUpdateUserStates";

export default function AcceptReceivedRequest({
  id,
  isPending,
  setters: { setIsPending },
}: IUserButtonsProps) {
  const [accept] = useAcceptReceivedRequestMutation();

  const acceptReq = async () => {
    setIsPending(true);

    try {
      await accept(id);
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      className={buttonStyles}
      variant={"default"}
      onClick={() => acceptReq()}
      disabled={isPending}
    >
      <UserCheck size={iconSize} /> Accept
    </Button>
  );
}
