import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  image: string;
  name: string;
  email: string;
}

export interface IAuth {
  user: IUser;
  token: string;
  isAuth: boolean;
}

const initialState: IAuth = {
  user: {
    id: "",
    image: "",
    name: "",
    email: "",
  },
  token: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Authentication reducers
    logIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.user = {
        id: "",
        image: "",
        name: "",
        email: "",
      };
      state.token = "";
    },
    // Separate reducers for each action
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const selectAuth = (state: { auth: IAuth }) => state.auth;
export const isAuthed = (state: { auth: IAuth }) => state.auth.isAuth;

export const { logIn, logOut, setUser, setToken, setIsAuth } =
  authSlice.actions;

export default authSlice.reducer;
