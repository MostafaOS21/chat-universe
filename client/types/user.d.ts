export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface IUser {
  _id: string;
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  status: UserStatus;
}
