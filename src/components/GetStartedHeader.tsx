import Links from "./Links";

function GetStartedHeader() {
  return (
    <header className="border-b border-black py-4">
      <div className="w-full">
        <div className="md:container-get-started flex items-center justify-between px-6 md:px-0">
          <img src="/logo.svg" className="w-40" />
          <div className="flex items-center gap-6">
            <Links to="sign-in" label="Sign In" type="dark" />
            <button className="font-SohneLight hidden rounded-full bg-[#000000]
             px-3.5 py-2 text-sm text-white md:block">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GetStartedHeader;
