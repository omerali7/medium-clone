import { useMutation } from "@tanstack/react-query";
import { createUser, signInUser, User } from "../api/user";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (user: User) => createUser(user),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInUser(user),
  });
};
