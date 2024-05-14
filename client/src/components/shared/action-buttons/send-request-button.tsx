import { Button } from "@/components/ui/button";
import { buttonStyles, iconSize } from "@/lib/constants";
import { IUserButtonsProps } from "@/lib/interfaces";
import { useSendRequestMutation } from "@/lib/redux/services/requests/requestsService";
import { UserPlus } from "lucide-react";
import React from "react";

export default function SendRequestButton({
  isPending,
  id,
  setters,
}: IUserButtonsProps) {
  const [addRequest] = useSendRequestMutation();

  const handleAddRequest = async () => {
    setters.setIsPending(true);

    try {
      await addRequest(id);
    } catch (error) {
    } finally {
      setters.setIsPending(false);
    }
  };

  return (
    <Button
      className={buttonStyles}
      onClick={handleAddRequest}
      disabled={isPending}
    >
      <UserPlus size={iconSize} /> Request
    </Button>
  );
}
