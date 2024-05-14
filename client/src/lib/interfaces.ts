export interface ApiResponse<T = undefined> {
  message: string;
  data?: T;
}

export type FriendShipStatus = "pending" | "accepted" | "rejected" | null;

export interface IRequestFriend extends IUser {
  status: FriendShipStatus;
  isSender: boolean;
}

export interface IRequest {
  _id: string;
  sender: string;
  receiver: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
  status: FriendShipStatus;
}

export interface IRequestPopulated {
  _id: string;
  name: string;
  username: string;
  image: string;
}

// User Buttons Component Props
import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../types/user";
export interface IUserButtonsProps {
  id: string;
  isPending: boolean;
  setters: {
    setIsPending: Dispatch<SetStateAction<boolean>>;
    // setUsers: Dispatch<SetStateAction<IRequestFriend[]>>;
    // setOptimisticUsers: Dispatch<SetStateAction<IRequestFriend[]>>;
  };
}
