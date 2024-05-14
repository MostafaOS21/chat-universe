import { ApiResponse, IRequestFriend } from "@/lib/interfaces";
import apiSlice from "../../api/apiSlice";

// GET /auth/search/{username}
interface IGetSearchUsersParams {
  search: string;
  page: number;
  limit?: number;
}

export const usersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /auth/search/{username}
    getSearchUsers: builder.query<
      ApiResponse<IRequestFriend[]>,
      IGetSearchUsersParams
    >({
      query: ({ search, page, limit = 15 }) => ({
        url: `/auth/search/${search}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Search-Users"],
    }),
  }),
});

export const { useLazyGetSearchUsersQuery } = usersService;
