import MainHeader from "../components/MainHeader";
import {
  useGetAllPosts,
  useGetPostsByTitle,
} from "../react-query/queriesAndMutation.ts";
import PostList from "../components/PostList.tsx";
import { usePostContext } from "../context/PostContext.tsx";

export default function Home() {
  const { query } = usePostContext();

  const { data, isLoading } = useGetAllPosts();

  const { data: queryPostData, isLoading: queryPostDataLoading } =
    useGetPostsByTitle(query);

  return (
    <div
      className={`${data === 0 || queryPostData === 0 ? "h-dvh" : "h-full"}`}
    >
      <MainHeader />
      <main className="lg:container-home sm:container-home-bg flex h-full w-full justify-evenly gap-16">
        <div className="h-full w-[100%] divide-y divide-[#F2F2F2] border-[#F2F2F2] pt-6 px-4 sm:px-0">
          {query ? (
            !queryPostDataLoading && queryPostData !== "" ? (
              <PostList data={queryPostData} />
            ) : (
              <p>No results found</p>
            )
          ) : (
            !isLoading && <PostList data={data} />
          )}
        </div>
        <div className="w-[28%] border-l pt-6 hidden xl:block"></div>
      </main>
    </div>
  );
}
