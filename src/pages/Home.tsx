import MainHeader from "../components/MainHeader";
import {
  useGetAllPosts,
  useGetPostsByTitle,
} from "../react-query/queriesAndMutation.ts";
import PostList from "../components/PostList.tsx";
import { usePostContext } from "../context/PostContext.tsx";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import PostsSkeleton from "../components/PostsSkeleton.tsx";
import { useDebounce } from "use-debounce";

export default function Home() {
  const { query } = usePostContext();

  const { ref, inView } = useInView();

  const [debouncedQuery] = useDebounce(query, 300);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetAllPosts();
  const { data: queryPostData, isLoading: queryPostDataLoading } =
    useGetPostsByTitle(debouncedQuery);

  const isLoadingPosts = isLoading || queryPostDataLoading;

  const postsToShow = useMemo(() => {
    return debouncedQuery ? queryPostData : data?.pages.flatMap((page) => page);
  }, [debouncedQuery, queryPostData, data]);

  useEffect(() => {
    if (inView && hasNextPage && !debouncedQuery) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, debouncedQuery]);

  useEffect(() => {
    async function run() {
      if (!debouncedQuery) await refetch();
    }

    run();
  }, [debouncedQuery, refetch]);

  return (
    // <div className={`${isLoadingPosts ? "h-full" : "h-dvh"}`}>
    <div className="h-full">
      <MainHeader />
      <main className="lg:container-home sm:container-home-bg flex h-full w-full justify-evenly gap-16">
        <div
          className={`h-full w-[100%] ${!isLoadingPosts && "divide-y divide-[#F2F2F2]"} px-4 pt-6 sm:px-0`}
        >
          {isLoadingPosts ? (
            <>
              <PostsSkeleton />
            </>
          ) : postsToShow && postsToShow.length > 0 ? (
            <>
              <PostList data={postsToShow} />
              {isFetchingNextPage && <PostsSkeleton />}
              <button ref={ref}></button>
            </>
          ) : (
            <p>No results found</p>
          )}
        </div>
        <div className="hidden w-[28%] border-l pt-6 xl:block"></div>
      </main>
    </div>
  );
}
