"use server";

import { cookies } from "next/headers";

export const getAuthorizationHeader = async () => {
  const authorization = cookies().get("authorization");

  if (!authorization) {
    return null;
  }

  return authorization;
};
