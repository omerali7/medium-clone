import { createContext, useContext, useState } from "react";
import { Post } from "../api/post";
import React from "react";
import { useCreatePost } from "../react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";

type PostState = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent, userId: number) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isCreatingPost: boolean;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: Post & PostState = {
  title: "",
  content: "",
  image: "",
  setTitle: () => {},
  setContent: () => {},
  setFile: () => {},
  onSubmit: () => {},
  query: "",
  setQuery: () => {},
  isCreatingPost: true,
  setIsCreatingPost: () => {},
};

const PostContext = createContext(initialState);

export default function PostProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<string>("");

  const [query, setQuery] = useState<string>("");

  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);

  const { mutateAsync } = useCreatePost();

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent, userId: number) => {
    setIsCreatingPost(true);
    e.preventDefault();

    console.log(file);

    const post: Post = {
      title,
      content,
      image: file,
    };

    console.log(post);

    const createdPost = await mutateAsync({ post, userId });

    if (createdPost) {
      console.log(createdPost);
      setIsCreatingPost(false);
      navigate(`/post/${createdPost.id}`);
    }

    if (!createdPost) throw Error;

    setTitle("");
    setContent("");
    setFile("");
  };

  return (
    <PostContext.Provider
      value={{
        isCreatingPost,
        setIsCreatingPost,
        query,
        setQuery,
        title,
        setTitle,
        content,
        setContent,
        setFile,
        image: file,
        onSubmit,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => useContext(PostContext);
