import { ApiResponse } from "./../../../interfaces";
import apiSlice from "../../api/apiSlice";
import { Friend } from "../../features/friends/friendsSlice";
import { IUser } from "../../../../../types/user";

export const chatService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // GET /chat/latest
    getLatestChats: build.query<ApiResponse<Friend[]>, any>({
      query: () => ({
        url: `/chat/latest`,
        method: "GET",
      }),
    }),
    // GET /chat/{friendId}
    getChat: build.query<ApiResponse<any>, string>({
      query: (friendId) => ({
        url: `/chat/${friendId}`,
        method: "GET",
      }),
    }),
    // /api/chat/profile/{friendId}
    getChatFriendProfile: build.query<ApiResponse<IUser>, string>({
      query: (friendId) => ({
        url: `/chat/profile/${friendId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLatestChatsQuery,
  useGetChatQuery,
  useGetChatFriendProfileQuery,
} = chatService;
