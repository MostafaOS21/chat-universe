import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery() as any,
  endpoints: () => ({}),
});

export default apiSlice;
