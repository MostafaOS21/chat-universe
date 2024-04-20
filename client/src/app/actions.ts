"use server";

// Authentication actions

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const data = {
    name,
    email,
    password,
    confirmPassword,
    op: "signUp",
  };

  // await signIn("credentials", {
  //   ...data,
  //   redirectTo: "/chat",
  // });
};

export const logIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = {
    email,
    password,
    op: "signIn",
  };

  // await signIn("credentials", data, { ...data, redirectTo: "/chat" });
};

export const signOutAction = async () => {
  // await signOut();
};
