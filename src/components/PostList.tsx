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
      {data?.length !== 0 || !data ? (
        data.map((post: PostType) => {
          if (post)
            return (
              <Post
                key={post.id}
                title={post.title}
                content={post.content}
                image={post.image}
                id={post.id}
                createdAt={post.createdAt}
                userId={post.userId}
                userImage={post.userImage}
                userName={post.userName}
                profile={profile}
              />
            );
        })
      ) : (
        <p>No posts</p>
      )}
    </>
  );
}
