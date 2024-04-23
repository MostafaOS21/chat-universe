import { getAvatarUrl } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface IAuth {
  user: IUser;
  // token: string;
  isAuth: boolean;
}

const initialState: IAuth = {
  user: {
    _id: "",
    id: "",
    image: "",
    name: "",
    email: "",
    username: "",
    createdAt: "",
    updatedAt: "",
  },
  // token: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Authentication reducers
    logIn: (state, action) => {
      state.user = action.payload.user;

      state.user.image = getAvatarUrl(state.user.image);
      state.isAuth = true;
    },
    logOut: (state) => {
      state.user = {
        _id: "",
        id: "",
        image: "",
        name: "",
        email: "",
        username: "",
        createdAt: "",
        updatedAt: "",
      };
    },
    // Separate reducers for each action
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {},
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const selectAuth = (state: { auth: IAuth }) => state.auth;
export const selectUser = (state: { auth: IAuth }) => state.auth.user;
export const isAuthed = (state: { auth: IAuth }) => state.auth.isAuth;

export const { logIn, logOut, setUser, setToken, setIsAuth } =
  authSlice.actions;
export default authSlice;
