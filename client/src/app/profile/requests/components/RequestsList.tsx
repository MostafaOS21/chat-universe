import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IRequest, IRequestPopulated } from "@/lib/interfaces";
import { getAvatarUrl, sliceString } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React, { useEffect } from "react";
import { SkeletonLoaders } from "./SkeletonLoaders";
import { useCancelSentRequestMutation } from "@/lib/redux/services/requests/requestsService";
import { useToast } from "@/components/ui/use-toast";
import CancelSentRequestButton from "@/components/shared/action-buttons/cancel-sent-request-button";
import RejectReceivedRequest from "@/components/shared/action-buttons/reject-received-request";
import AcceptReceivedRequest from "@/components/shared/action-buttons/accept-received-request";

type ItemType = "received" | "sent";

const RequestItem = ({
  item,
  type,
}: {
  item: IRequestPopulated;
  type: ItemType;
}) => {
  const [isPending, setIsPending] = React.useState(false);

  // Actions Buttons
  let actions;

  if (type === "sent") {
    actions = (
      <CancelSentRequestButton
        id={item._id}
        setters={{ setIsPending }}
        isPending={isPending}
      />
    );
  } else {
    actions = (
      <div className="flex items-center gap-3">
        {/* Cancel Request */}
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-red-700 hover:text-red-800 bg-transparent rounded-lg"
              variant={"ghost"}
            >
              <X size={17} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reject</p>
          </TooltipContent>
        </Tooltip> */}
        <RejectReceivedRequest
          id={item._id}
          setters={{ setIsPending }}
          isPending={isPending}
        />

        {/* Accept Request */}
        <AcceptReceivedRequest
          id={item._id}
          setters={{ setIsPending }}
          isPending={isPending}
        />
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-green-700 hover:text-green-800 bg-transparent rounded-lg"
              variant={"ghost"}
            >
              <Check size={17} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Accept</p>
          </TooltipContent>
        </Tooltip> */}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="w-full flex items-center gap-3 p-3 bg-secondary/55 rounded-lg">
        <Avatar>
          <AvatarImage
            src={getAvatarUrl(item.image)}
            alt="Sender avatar image"
            className="w-[40px] h-[40px]"
          />
        </Avatar>

        <div className="text-sm grid grid-cols-1">
          <p>{sliceString(item.name, 80)}</p>
          <Tooltip>
            <TooltipTrigger className="text-xs">
              @{sliceString(item.username, 20)}
            </TooltipTrigger>
            <TooltipContent>
              <p>@{item.username}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="ml-auto">{actions}</div>
      </div>
    </TooltipProvider>
  );
};

export default function RequestsList({
  type,
  items,
}: {
  type: ItemType;
  items?: IRequest[];
}) {
  if (!items) {
    return <SkeletonLoaders />;
  }

  console.log(type);
  console.log(items);

  if (type === "received") {
    return items.map((item) => (
      <RequestItem item={item.sender} type={type} key={item._id} />
    ));
  }

  return items.map((item) => (
    <RequestItem item={item.receiver} type={type} key={item._id} />
  ));
}
