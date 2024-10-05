import MainHeader from "../components/MainHeader";

export default function Home() {
  return (
    <div className="h-dvh">
      <MainHeader />
      <main className="grid h-full w-full grid-cols-11">
        <div className="col-span-7 border-r border-[#F2F2F2]"></div>
      </main>
    </div>
  );
}
