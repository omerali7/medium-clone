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

  // Determine loading state
  const isLoadingPosts = isLoading || queryPostDataLoading;
  const postsToShow = query ? queryPostData : data;

  return (
    <div className={`${isLoadingPosts ? "h-full" : "h-dvh"}`}>
      <MainHeader />
      <main className="lg:container-home sm:container-home-bg flex h-full w-full justify-evenly gap-16">
        <div
          className={`h-full w-[100%] ${!isLoadingPosts && "divide-y divide-[#F2F2F2]"} border-[#F2F2F2] px-4 pt-6 sm:px-0`}
        >
          {/* Show skeleton loader if posts are still loading */}
          {isLoadingPosts ? (
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
          ) : postsToShow && postsToShow.length > 0 ? (
            // Show the posts when data is ready
            <PostList data={postsToShow} />
          ) : (
            // Fallback if no posts are found
            <p>No results found</p>
          )}
        </div>
        <div className="hidden w-[28%] border-l pt-6 xl:block"></div>
      </main>
    </div>
  );
}
