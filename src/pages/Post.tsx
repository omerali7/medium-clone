import { Link, useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { useGetPostById } from "../react-query/queriesAndMutation";
import Skeleton from "../components/Skeleton";
import { formatDate } from "../utils/utils";
import { useEffect } from "react";
import { FaHandsClapping } from "react-icons/fa6";

export default function Post() {
  const { id } = useParams();

  const times = [1, 2, 3, 4, 5];

  const { data, isLoading } = useGetPostById(Number(id));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component is mounted
  }, []);

  return (
    <>
      <MainHeader />

      <main className="container-post pt-12">
        <h1 className="font-SohneBoldNew text-4xl leading-[1.3] tracking-wide">
          {!isLoading ? (
            <div className="opacity-100 transition-opacity duration-500">
              {data.title}
            </div>
          ) : (
            <div className="skeleton skeleton-text-heading"></div>
          )}
        </h1>
        <Link to={`/profile/${data?.user?.id}`}>
          <div className="mt-5 flex gap-4">
            <img
              src={`${!isLoading ? data.user.image : ""}`}
              className="skeleton w-[8%] rounded-full"
            />
            <div className="mb-[2px] flex w-full flex-col">
              {!isLoading ? (
                <>
                  <p className="font-SohneLight mt-[1px] text-base opacity-100 transition-opacity duration-500 hover:underline">
                    {data.user.name}
                  </p>

                  <p className="font-SohneLight text-xs text-[#6B6B6B] opacity-100 transition-opacity duration-500">
                    {formatDate(data.createdAt)}
                  </p>
                </>
              ) : (
                <>
                  <div className="skeleton skeleton-text-small"></div>
                  <div className="skeleton skeleton-text-small"></div>
                </>
              )}
            </div>
          </div>
        </Link>
        {!isLoading ? (
          <>
            <img
              src={data.image}
              className="mt-10 w-full opacity-100 transition-opacity duration-500"
            />
            <p className="font-GTSuperLight mt-10 text-xl leading-[1.6] tracking-wider text-black opacity-100 transition-opacity duration-500">
              {data.content}
            </p>
            <div className="w-full flex items-end mb-4">
              <p className="font-SohneLight ml-auto mt-4 flex cursor-pointer items-center gap-2 text-sm text-[#6B6B6B]">
                <FaHandsClapping /> <span>23</span>
              </p>
            </div>
          </>
        ) : (
          times.map((time) => (
            <div className="mt-10" key={time}>
              <Skeleton />
            </div>
          ))
        )}
      </main>
    </>
  );
}
