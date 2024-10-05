import Links from "./Links";

function GetStartedHeader() {
  return (
    <header className="border-b border-black py-4">
      <div className="w-full">
        <div className="container-get-started flex items-center justify-between">
          <img src="/logo.svg" className="w-40" />
          <div className="flex items-center gap-6">
            <Links to="sign-in" label="Sign In" type="dark" />
            <button className="font-SohneLight rounded-full bg-[#000000] px-3.5 py-2 text-sm text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GetStartedHeader;
