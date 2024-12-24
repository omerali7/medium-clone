import { Link, useLocation, useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import PostList from "../components/PostList";
import {
  useGetPostsByUserId,
  useGetUserById,
} from "../react-query/queriesAndMutation";
import ProfileInformation from "../components/ProfileInformation";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import Skeleton from "../components/Skeleton";

export default function Profile() {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { id } = useParams();

  const isLoggedInUser = pathname === "/my-profile";

  const { data: userData, isLoading: userDataLoading } = useGetUserById(
    pathname === "/my-profile" ? user.id : Number(id),
  );

  const [currentOpen, setCurrentOpen] = useState<string>("stories");

  const { data, isLoading } = useGetPostsByUserId(
    pathname === "/my-profile" ? user.id : Number(id),
  );

  const times = [1, 2, 3, 4];

  return (
    <div className="h-dvh">
      <MainHeader />
      <main className="lg:container-home h-full w-full lg:flex lg:justify-evenly lg:gap-16">
        <div className="sm:container-profile px-6 pt-6 lg:hidden">
          <ProfileInformation
            isLoggedInUser={isLoggedInUser}
            name={userData?.name}
            image={userData?.image}
            userDataLoading={userDataLoading}
          />
          <div className="font-SohneLight mt-6 flex items-center gap-8 border-b text-base text-[#6B6B6B]">
            <button
              className={`pb-2 ${currentOpen === "stories" && "border-b border-black text-[#242424]"}`}
              onClick={() => setCurrentOpen("stories")}
            >
              Stories
            </button>
            {isLoggedInUser && (
              <button
                className={`pb-2 ${currentOpen === "edit" && "border-b border-black text-[#242424]"}`}
                onClick={() => setCurrentOpen("edit")}
              >
                Edit
              </button>
            )}
          </div>
          {currentOpen === "stories" && (
            <div className="mt-6 divide-y divide-[#F2F2F2]">
              {!isLoading ? (
                data !== "" ? (
                  <PostList data={data} profile={isLoggedInUser} />
                ) : (
                  <p>No posts yet</p>
                )
              ) : (
                times.map((time) => (
                  <div key={time}>
                    <div className="skeleton skeleton-text-small"></div>
                    <div className="mt-4">
                      <Skeleton />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {currentOpen === "edit" && (
            <ProfileInformation
              isLoggedInUser={isLoggedInUser}
              name={userData?.name}
              image={userData?.image}
              currentOpen={true}
              userDataLoading={userDataLoading}
            />
          )}
        </div>

        <div className="hidden h-full w-[62%] border-[#F2F2F2] pt-10 lg:block">
          <div className="flex items-center justify-between">
            <h1 className="font-SohneBoldNew text-4xl">
              {isLoggedInUser ? "Your stories" : "Stories"}
            </h1>
            <div className="flex items-center">
              {isLoggedInUser && (
                <Link
                  to="/create"
                  className="font-SohneLight rounded-full bg-[#156D12] px-3.5 pb-2 pt-1.5 text-sm text-white"
                >
                  Write a story
                </Link>
              )}
            </div>
          </div>
          <div className="mt-6 divide-y divide-[#F2F2F2]">
            {!isLoading ? (
              data !== "" && data.length !== 0 ? (
                <PostList data={data} profile={isLoggedInUser} />
              ) : (
                <p>No posts yet</p>
              )
            ) : (
              times.map((time) => (
                <div key={time}>
                  <div className="skeleton skeleton-text-small"></div>
                  <div className="mt-4">
                    <Skeleton />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="hidden w-[28%] pt-10 lg:block lg:border-l">
          <ProfileInformation
            isLoggedInUser={isLoggedInUser}
            name={userData?.name}
            image={userData?.image}
            userDataLoading={userDataLoading}
          />
        </div>
      </main>
    </div>
  );
}
