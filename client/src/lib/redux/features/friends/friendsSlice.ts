import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./../../../../../types/user.d";
import { chatService } from "../../services/chat/chatService";

export type Friend = Pick<
  IUser,
  "_id" | "username" | "email" | "image" | "status" | "createdAt" | "name"
>;

export interface IFriendsState {
  friends: Friend[];
}

const initialState: IFriendsState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<Friend[]>) {
      state.friends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatService.endpoints.getLatestChats.matchFulfilled,
      (state, { payload }) => {
        const newFriends = payload.data || [];

        if (newFriends.length > 0) {
          state.friends.push(...newFriends);

          // Remove duplicates
          state.friends = state.friends.filter(
            (friend, index, self) =>
              index ===
              self.findIndex((f) => f._id.toString() === friend._id.toString())
          );
        }

        return state;
      }
    );
  },
});

export const selectFriends = (state: { friends: IFriendsState }) =>
  state.friends.friends;
export const { setFriends } = friendsSlice.actions;
