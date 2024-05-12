import { ApiResponse, IRequestFriend } from "@/lib/interfaces";
import apiSlice from "../../api/apiSlice";

// GET /auth/search/{username}
interface IGetSearchUsersParams {
  search: string;
}

const usersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /auth/search/{username}
    getSearchUsers: builder.query<
      ApiResponse<IRequestFriend[]>,
      IGetSearchUsersParams
    >({
      query: ({ search }) => ({
        url: `/auth/search/${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetSearchUsersQuery } = usersService;
