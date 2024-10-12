import { Post as PostType } from "../api/post.ts";
import Post from "./Post.tsx";

export default function PostList({
  data,
  profile = false,
}: {
  data: PostType[];
  profile?: boolean;
}) {
  return (
    <>
      {data.length !== 0 || !data ? (
        data.map((post: PostType) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            image={post.image}
            id={post.id}
            createdAt={post.createdAt}
            user={post.user}
            profile={profile}
          />
        ))
      ) : (
        <p>No posts</p>
      )}
    </>
  );
}
