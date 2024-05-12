import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { api as axiosInstance } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { generateAccessToken, verifyAccessToken } from "@/app/actions";
import { IUser } from "../../../../types/user";
import { setToken } from "../features/auth/authSlice";
// TODO: Import login and logout from authSlice

export interface AxiosBaseQueryArgs<Meta, Response> {
  meta?: Meta;
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: BaseQueryApi
  ) => AxiosRequestHeaders;
  transformResponse?: (response: Response) => unknown;
}

export interface ServiceExtraOptions {
  authRequired?: boolean;
}
export const axiosBaseQuery =
  ():
    | BaseQueryFn<
        {
          url: string;
          method?: AxiosRequestConfig["method"];
          data?: AxiosRequestConfig["data"];
          params?: AxiosRequestConfig["params"];
          headers?: AxiosRequestConfig["headers"];
        },
        BaseQueryApi,
        { status: number; data: string }
      >
    | {} =>
  async ({ url, method, data, params, headers }, api) => {
    // @ts-ignore
    const token = api.getState()?.auth?.token;

    try {
      axiosInstance.interceptors.request.use(async (config) => {
        const { result, payload } = await verifyAccessToken(token);

        config.headers;

        if (!result) {
          const token = await generateAccessToken();

          if (token) {
            api.dispatch(setToken(token));
          }
        }

        return config;
      });

      const result = await axiosInstance({
        url,
        method,
        params,
        headers,
        data,
      });

      return { data: result.data };
    } catch (axiosError) {
      console.log(`From Second Catch:`);
      console.log(axiosError);
      const err = ApiError.generate(axiosError);
      const error = {
        status: err.status,
        message: err.message,
      };

      return {
        error,
      };
    }
  };
