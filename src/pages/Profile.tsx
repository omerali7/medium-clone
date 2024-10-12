import { Link, useLocation, useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import PostList from "../components/PostList";
import {
  useGetPostsByUserId,
  useGetUserById,
} from "../react-query/queriesAndMutation";
import ProfileInformation from "../components/ProfileInformation";
import { useUserContext } from "../context/UserContext";

export default function Profile() {
  const { user, isLoading: isUserLoading } = useUserContext();

  const { pathname } = useLocation();

  const { id } = useParams();

  const isLoggedInUser = pathname === "/my-profile";

  const { data: userData, isLoading: userDataLoading } = useGetUserById(
    pathname === "/my-profile" ? user.id : Number(id),
  );

  const { data, isLoading } = useGetPostsByUserId(
    pathname === "/my-profile" ? user.id : Number(id),
  );

  if (isUserLoading || isLoading || userDataLoading) return null;

  return (
    <div className="h-dvh">
      <MainHeader />
      <main className="container-home flex h-full w-full justify-evenly gap-16">
      

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
            {!isLoading && data !== "" ? (
              <PostList data={data} profile={isLoggedInUser} />
            ) : (
              <p>No posts yet</p>
            )}
          </div>
        </div>
        <div className="hidden w-[28%] pt-10 lg:block lg:border-l">
          <ProfileInformation
            isLoggedInUser={isLoggedInUser}
            name={userData.name}
            image={userData.image}
          />
        </div>
      </main>
    </div>
  );
}
