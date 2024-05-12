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

// PATCH /friends-request/sent/cancel/:id
interface ICancelSentRequestParams {
  id: string;
}

export const requestsService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
    cancelSentRequest: build.mutation<string, ICancelSentRequestParams>({
      query: ({ id }) => ({
        url: `/friends-requests/sent/cancel/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetReceivedRequestsQuery,
  useGetSentRequestsQuery,
  useCancelSentRequestMutation,
} = requestsService;
