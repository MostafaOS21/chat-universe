import { Button } from "@/components/ui/button";
import { buttonStyles, iconSize } from "@/lib/constants";
import { IUserButtonsProps } from "@/lib/interfaces";
import { useCancelSentRequestMutation } from "@/lib/redux/services/requests/requestsService";
import { UserRoundX } from "lucide-react";
import React from "react";

export default function CancelSentRequestButton({
  isPending,
  setters,
  id,
}: IUserButtonsProps) {
  const [cancelRequest] = useCancelSentRequestMutation();

  const handleCancelRequest = async () => {
    setters.setIsPending(true);

    try {
      await cancelRequest(id);
    } catch (error) {
    } finally {
      setters.setIsPending(false);
    }
  };

  return (
    <Button
      className={buttonStyles}
      variant={"secondary"}
      onClick={handleCancelRequest}
      disabled={isPending}
    >
      <UserRoundX size={iconSize} /> Cancel
    </Button>
  );
}
