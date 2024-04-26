import { IUser } from "./redux/features/authSlice";

export interface ApiResponse<T = undefined> {
  message: string;
  data?: T;
}

export interface IRequestFriend extends IUser {
  status: "pending" | "accepted" | null;
}

export interface IReceivedRequests {
  _id: string;
  sender: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
  receiver: string;
  status: "pending" | "accepted" | "rejected";
}
