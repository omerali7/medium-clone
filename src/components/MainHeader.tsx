import { LuSearch } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { usePostContext } from "../context/PostContext";

export default function MainHeader() {
  const { query, setQuery } = usePostContext();

  const { user } = useUserContext();

  const { image } = user;

  return (
    <header className="flex w-full items-center justify-between border border-b border-[#F2F2F2] px-1.5 py-2 sm:px-3">
      <div className="relative flex items-center gap-2 sm:gap-4">
        <Link to="/home" className="hidden sm:block">
          <img src="/logo.svg" className="w-40" />
        </Link>
        <LuSearch className="absolute left-[41%] hidden h-4 w-4 font-thin text-[#6B6B6B] sm:block" />
        <form>
          <input
            type="text"
            className="font-SohneLight w-56 rounded-full bg-[#F9F9F9] py-3 pl-6 pr-2 text-sm text-[#6B6B6B] outline-none sm:w-72 sm:pl-10"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-3 md:gap-8">
        <NavLink to="/create" className="flex items-center gap-1">
          <IoCreateOutline className="mb-[4px] h-6 w-6 cursor-pointer text-[#242424]" />
          <p className="font-SohneLight hidden text-base font-thin text-[#242424] sm:block">
            Write
          </p>
        </NavLink>
        <NavLink to="/" className="hidden items-center gap-1 md:flex">
          <IoIosNotificationsOutline className="h-7 w-7 cursor-pointer text-[#242424]" />
        </NavLink>
        <NavLink to="/my-profile" className="flex items-center gap-1">
          <img
            src={image || "/default-profile-picture.png"}
            className="rounded-full border border-[#cccs]"
            width={34}
            height={34}
          />
        </NavLink>
      </div>
    </header>
  );
}
