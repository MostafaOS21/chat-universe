import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-basequery";
import { ApiResponse, IReceivedRequests } from "@/lib/interfaces";

export const apiRedux = createApi({
  reducerPath: "apiRedux",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getReceivedRequests: builder.query<
      ApiResponse<IReceivedRequests[]>,
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit = 30 }: { page: number; limit: number }) => ({
        url: "friends-requests/received",
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetReceivedRequestsQuery } = apiRedux;
