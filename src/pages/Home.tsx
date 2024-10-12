import MainHeader from "../components/MainHeader";
import {
  useGetAllPosts,
  useGetPostsByTitle,
} from "../react-query/queriesAndMutation.ts";
import PostList from "../components/PostList.tsx";
import { usePostContext } from "../context/PostContext.tsx";
import Skeleton from "../components/Skeleton.tsx";

export default function Home() {
  const { query } = usePostContext();

  const { data, isLoading } = useGetAllPosts();

  const { data: queryPostData, isLoading: queryPostDataLoading } =
    useGetPostsByTitle(query);

  const times = [1, 2, 3, 4, 5];

  return (
    <div
      className={`${data === 0 || queryPostData === 0 || !isLoading || !queryPostDataLoading ? "h-dvh" : "h-full"}`}
    >
      <MainHeader />
      <main className="lg:container-home sm:container-home-bg flex h-full w-full justify-evenly gap-16">
        <div className="h-full w-[100%] divide-y divide-[#F2F2F2] border-[#F2F2F2] px-4 pt-6 sm:px-0">
          {!isLoading || !queryPostDataLoading ? (
            query ? (
              queryPostData !== ""  && !queryPostDataLoading ? (
                <PostList data={queryPostData} />
              ) : (
                <p>No results found</p>
              )
            ) : (
              !isLoading && data && <PostList data={data} />
            )
          ) : (
            <>
              {times.map((time) => (
                <div key={time}>
                  <div className="skeleton skeleton-text-small"></div>
                  <div className="mt-4">
                    <Skeleton />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="hidden w-[28%] border-l pt-6 xl:block"></div>
      </main>
    </div>
  );
}
