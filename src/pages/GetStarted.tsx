import { Outlet, useNavigate } from "react-router-dom";
import GetStartedFooter from "../components/GetStartedFooter";
import GetStartedHeader from "../components/GetStartedHeader";
import { useUserContext } from "../context/UserContext";

export default function GetStarted() {
  const { isAuthenticated } = useUserContext();

  const navigate = useNavigate();

  if (isAuthenticated) navigate("/home");

  return (
    <>
      <div className="get-started-bg-color relative h-dvh w-full">
        <GetStartedHeader />
        <div className="lg:container-get-started md:container-get-started-md h-[86%]">
          <main className="flex h-full items-center justify-center px-6 md:px-0">
            <div className="flex flex-col items-center gap-2 pr-2">
              <h1 className="font-GTSuperMedium mb-4 text-wrap text-[60px] leading-[1] md:text-[74px] xl:text-[102px]">
                Human stories & ideas
              </h1>
              <p className="font-SohneBold text-base md:text-xl">
                A place to read, write, and deepen your understanding
              </p>
              <button className="font-SohneBold mt-8 w-[50%] rounded-full bg-[#000000] px-6 py-2 text-sm text-white sm:w-[18%] md:w-[20%] lg:text-lg md:text-base">
                Start reading
              </button>
            </div>
          </main>
        </div>
        <Outlet />
        <GetStartedFooter />
      </div>
    </>
  );
}
