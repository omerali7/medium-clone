import axios from "axios";

export type Post = {
  title: string;
  content: string;
  image: string;
  id?: number;
  createdAt?: string;
  user?: PostUser;
};

export type PostUser = {
  id: number;
  name: string;
  image: string;
};

export async function createPost(post: Post, userId: number) {
  try {
    const res = await axios.post(
      `http://localhost:8080/posts/${userId}`,
      JSON.stringify(post),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPosts() {
  try {
    const res = await axios.get("http://localhost:8080/posts");

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId: number) {
  try {
    const res = await axios.get(`http://localhost:8080/posts/${postId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsByUserId(userId: number | undefined) {
  try {
    const res = await axios.get(`http://localhost:8080/posts/user/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostByTitle(title: string) {
  try {
    const res = await axios.get(`http://localhost:8080/posts/title?q=${title}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
