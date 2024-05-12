import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseUrl } from "./features/api";
import { ApiResponse } from "./lib/interfaces";
import { IUser } from "../types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      // TODO: Move this to a separate file
      credentials: {
        name: {},
        email: {},
        password: {},
        confirmPassword: {},
        type: {},
      },
      // @ts-ignore
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists

        const res = await fetch(baseUrl("/auth/sign-in"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data: ApiResponse<IUser> = await res.json();

        user = {
          ...data.data,
        };

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token;
      }

      return session;
    },
  },
});
