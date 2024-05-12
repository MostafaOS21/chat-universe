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
import React from "react";
import { SkeletonLoaders } from "./SkeletonLoaders";

type ItemType = "received" | "sent";

const RequestItem = ({
  item,
  type,
}: {
  item: IRequestPopulated;
  type: ItemType;
}) => {
  let actions;

  if (type === "sent") {
    actions = (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="text-red-700 hover:text-red-800 bg-transparent rounded-lg"
            variant={"ghost"}
          >
            <X size={17} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cancel</p>
        </TooltipContent>
      </Tooltip>
    );
  } else {
    actions = (
      <>
        {/* Cancel Request */}
        <Tooltip>
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
        </Tooltip>

        {/* Accept Request */}
        <Tooltip>
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
        </Tooltip>
      </>
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

  return items.map((item) => <RequestItem item={item.receiver} type={type} />);
}
