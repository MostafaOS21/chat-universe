"use server";

import { auth, signIn, signOut as logOut } from "@/auth";
import { ApiError } from "@/lib/api-error";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateAccessToken = async () => {
  const session = await auth();
  let token, userData;

  if (session?.user?.username) {
    userData = {
      _id: session.user.id,
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      createdAt: session.user.createdAt,
      updatedAt: session.user.updatedAt,
    };

    token = jwt.sign(userData, `${process.env.ACCESS_SECRET}`, {
      expiresIn: process.env.ACCESS_MAX_AGE,
    });

    cookies().set("Authorization", `Bearer ${token}`, {
      maxAge: Number(process.env.ACCESS_MAX_AGE),
    });
  }
  return { token, ...userData };
};

export const verifyAccessToken = async (token: string) => {
  let result, payload;
  const session = await auth();
  payload = session?.user;

  jwt.verify(token, `${process.env.ACCESS_SECRET}`, (err) => {
    if (err) {
      return (result = null);
    }

    result = true;
  });

  return { payload, result };
};

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await signIn("credentials", { email, password });
};

export const signOut = async () => {
  cookies().delete("Authorization");
  await logOut();
};
