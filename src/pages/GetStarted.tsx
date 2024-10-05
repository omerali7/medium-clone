import { Outlet } from "react-router-dom";
import GetStartedFooter from "../components/GetStartedFooter";
import GetStartedHeader from "../components/GetStartedHeader";

export default function GetStarted() {
  return (
    <>
      <div className="get-started-bg-color relative h-dvh w-full">
        <GetStartedHeader />
        <div className="container-get-started h-[86%]">
          <main className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-GTSuperMedium mb-4 text-wrap text-[102px] leading-[1]">
                Human stories & ideas
              </h1>
              <p className="font-SohneBold text-xl">
                A place to read, write, and deepen your understanding
              </p>
              <button className="font-SohneBold mt-8 w-[18%] rounded-full bg-[#000000] px-6 py-2 text-lg text-white">
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
