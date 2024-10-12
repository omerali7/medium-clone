import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getUserById,
  signInUser,
  updateUser,
  User,
} from "../api/user";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostByTitle,
  getPostsByUserId,
  Post,
} from "../api/post";

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

export const useGetUserById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id || 1),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      image,
      userId,
    }: {
      name: string;
      image: string;
      userId: number;
    }) => updateUser({ name, image, userId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ post, userId }: { post: Post; userId: number }) =>
      createPost(post, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};

export const useGetPostById = (id: number) => {
  return useQuery({ queryKey: ["post", id], queryFn: () => getPostById(id) });
};

export const useGetPostsByUserId = (id: number | undefined) => {
  return useQuery({
    queryKey: ["posts", "user", id],
    queryFn: () => getPostsByUserId(id),
  });
};

export const useGetPostsByTitle = (title: string) => {
  return useQuery({
    queryKey: ["posts", title],
    queryFn: () => getPostByTitle(title),
  });
};
