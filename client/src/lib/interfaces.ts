import { IUser } from "../../types/user";

export interface ApiResponse<T = undefined> {
  message: string;
  data?: T;
}

export interface IRequestFriend extends IUser {
  status: "pending" | "accepted" | null;
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
  status: "pending" | "accepted" | "rejected";
}

export interface IRequestPopulated {
  _id: string;
  name: string;
  username: string;
  image: string;
}
