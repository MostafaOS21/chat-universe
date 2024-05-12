import axios from "axios";

export const baseUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
