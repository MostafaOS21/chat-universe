import { Button } from "@/components/ui/button";
import { buttonStyles, iconSize } from "@/lib/constants";
import { IUserButtonsProps } from "@/lib/interfaces";
import { useRejectReceivedRequestMutation } from "@/lib/redux/services/requests/requestsService";
import { UserRoundX } from "lucide-react";
import React from "react";

export default function RejectReceivedRequest({
  id,
  isPending,
  setters,
}: IUserButtonsProps) {
  const [rejectRequest, { isLoading }] = useRejectReceivedRequestMutation();

  const handleRejectRequest = async () => {
    try {
      setters.setIsPending(true);

      await rejectRequest(id);
    } catch (error) {
    } finally {
      setters.setIsPending(false);
    }
  };

  return (
    <Button
      className={buttonStyles}
      variant={"secondary"}
      onClick={handleRejectRequest}
      disabled={isPending || isLoading}
    >
      <UserRoundX size={iconSize} />
    </Button>
  );
}
