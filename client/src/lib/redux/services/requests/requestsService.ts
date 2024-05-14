import { ApiResponse, IRequest } from "@/lib/interfaces";
import apiSlice from "../../api/apiSlice";

export const requestsLimit = 20;

// GET /friends-request/received
interface IGetFriendsRequestsParams {
  page: number;
  limit?: number;
}

// GET /friends-request/sent
interface IGetFriendsRequestsParams {
  page: number;
  limit?: number;
}

export const requestsService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // GET /friends-request/received
    getReceivedRequests: build.query<
      ApiResponse<IRequest[]>,
      IGetFriendsRequestsParams
    >({
      query: ({ page, limit = requestsLimit }) => ({
        url: "/friends-requests/received",
        method: "GET",
        params: { page, limit },
      }),
    }),
    // GET /friends-request/sent
    getSentRequests: build.query<
      ApiResponse<IRequest[]>,
      IGetFriendsRequestsParams
    >({
      query: ({ page, limit = requestsLimit }) => ({
        url: "/friends-requests/sent",
        method: "GET",
        params: { page, limit },
      }),
    }),
    // PATCH /friends-request/sent/cancel/:id
    cancelSentRequest: build.mutation<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/friends-requests/sent/cancel/${id}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["Search-Users"],
    }),
    acceptReceivedRequest: build.mutation<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/friends-requests/received/accept/${id}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["Search-Users"],
    }),
    // PATCH /api/friends-requests/received/unfriend/{id}
    unfriend: build.mutation<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/friends-requests/received/unfriend/${id}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["Search-Users"],
    }),
    // POST /friends-requests/send/{id}
    sendRequest: build.mutation<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/friends-requests/send/${id}`,
        method: "POST",
      }),
      // invalidatesTags: ["Search-Users"],
    }),
  }),
});

export const {
  useGetReceivedRequestsQuery,
  useGetSentRequestsQuery,
  useCancelSentRequestMutation,
  useAcceptReceivedRequestMutation,
  useSendRequestMutation,
  useUnfriendMutation,
} = requestsService;
