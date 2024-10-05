import { LuSearch } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function MainHeader() {
  return (
    <header className="flex w-full items-center justify-between border border-b border-[#F2F2F2] px-3 py-2">
      <div className="relative flex items-center gap-4">
        <img src="/logo.svg" className="w-40" />
        <LuSearch className="absolute left-[41%] h-4 w-4 font-thin text-[#6B6B6B]" />
        <input
          type="text"
          className="font-SohneLight w-72 rounded-full bg-[#F9F9F9] py-3 pl-10 pr-2 text-sm text-[#6B6B6B] outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center gap-8">
        <NavLink to="/create" className="flex items-center gap-1">
          <IoCreateOutline className="mb-[4px] h-6 w-6 cursor-pointer text-[#242424]" />
          <p className="font-SohneLight text-base font-thin text-[#242424]">
            Write
          </p>
        </NavLink>
        <NavLink to="/" className="flex items-center gap-1">
          <IoIosNotificationsOutline className="h-7 w-7 cursor-pointer text-[#242424]" />
        </NavLink>
        <NavLink to="/my-profile" className="flex items-center gap-1">
          <img
            src="/default-profile-picture.png"
            className="rounded-full border border-[#cccs]"
            width={34}
            height={34}
          />
        </NavLink>
      </div>
    </header>
  );
}
