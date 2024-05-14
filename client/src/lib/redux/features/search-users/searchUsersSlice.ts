import { IRequestFriend } from "@/lib/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { requestsService } from "../../services/requests/requestsService";
import { usersService } from "../../services/users/usersService";

const initialState: IRequestFriend[] = [];

export const searchUsersSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    setSearchUsers(state, { payload }) {
      // Push the new users to the state + remove duplicates
      const payloadData = payload.data || [];

      const newUsers = payloadData.filter(
        (user: IRequestFriend) => !state.some((u) => u._id === user._id)
      );

      return [...state, ...newUsers];
    },
    emptySearchUsers() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      usersService.endpoints.getSearchUsers.matchFulfilled,
      (state, { payload }) => {
        // Push the new users to the state + remove duplicates
        const payloadData = payload.data || [];

        const newUsers = payloadData.filter(
          (user: IRequestFriend) => !state.some((u) => u._id === user._id)
        );

        return [...state, ...newUsers];
      }
    ),
      builder.addMatcher(
        requestsService.endpoints.sendRequest.matchFulfilled,
        (state, { payload: { data } }) => {
          const id = data;
          return state.map((user) => {
            if (user._id === id) {
              return { ...user, status: "pending", isSender: true };
            }

            return user;
          });
        }
      ),
      builder.addMatcher(
        requestsService.endpoints.cancelSentRequest.matchFulfilled,
        (state, { payload: { data } }) => {
          const id = data;

          return state.map((user) => {
            console.log(user._id, id);
            console.log(user._id === id);
            if (user._id === id) {
              return { ...user, status: null };
            }

            return user;
          });
        }
      ),
      builder.addMatcher(
        requestsService.endpoints.unfriend.matchFulfilled,
        (state, { payload: { data } }) => {
          const id = data;

          return state.map((user) => {
            if (user._id === id) {
              return { ...user, status: null };
            }

            return user;
          });
        }
      ),
      builder.addMatcher(
        requestsService.endpoints.acceptReceivedRequest.matchFulfilled,
        (state, { payload: { data } }) => {
          const id = data;

          if (id) {
            return state.map((user) => {
              if (user._id === id) {
                return { ...user, status: "accepted" };
              }

              return user;
            });
          }
        }
      );
    builder.addMatcher(
      requestsService.endpoints.rejectReceivedRequest.matchFulfilled,
      (state, { payload: { data } }) => {
        const id = data;

        if (id) {
          return state.map((user) => {
            if (user._id === id) {
              return { ...user, status: "rejected", isRejectedOne: false };
            }

            return user;
          });
        }
      }
    );
  },
});

export const selectUsers = (state: { searchUsers: IRequestFriend[] }) =>
  state.searchUsers;

export const { setSearchUsers, emptySearchUsers } = searchUsersSlice.actions;
