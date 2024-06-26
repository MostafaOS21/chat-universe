import { createSlice } from "@reduxjs/toolkit";
import { IUser, UserStatus } from "../../../../../types/user.d";
import { getAvatarUrl } from "@/lib/utils";

export interface IAuth extends IUser {
  token: string | null;
}

const initialState: IAuth = {
  token: null,
  _id: "",
  id: "",
  username: "",
  email: "",
  name: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  status: UserStatus.INACTIVE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Authentication reducers
    // login
    login: (state, action) => {
      state._id = action.payload._id;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = getAvatarUrl(action.payload.image);
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.token = action.payload.token;
      state.status = UserStatus.ACTIVE;

      return state;
    },
    // logout
    logout: (state) => {
      state._id = "";
      state.id = "";
      state.username = "";
      state.email = "";
      state.name = "";
      state.image = "";
      state.createdAt = "";
      state.updatedAt = "";
      state.token = null;
    },
    // set token
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },

    activeUser: (state) => {
      state.status = UserStatus.ACTIVE;
    },
    inactiveUser: (state) => {
      state.status = UserStatus.INACTIVE;
    },
  },
});

export const selectUser = (state: { auth: IAuth }) => state.auth;
export const selectToken = (state: { auth: IAuth }) => state.auth.token;

export const {
  login,
  setToken,
  removeToken,
  logout,
  activeUser,
  inactiveUser,
} = authSlice.actions;
export default authSlice;
