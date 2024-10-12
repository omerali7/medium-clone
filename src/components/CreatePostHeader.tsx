import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function CreatePostHeader({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { user, isLoading } = useUserContext();

  return (
    <header className="mb-8 flex items-center justify-between py-5">
      <Link to="/home">
        <img src="/logo.svg" className="w-40" />
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          to={`${title || body ? "edit" : "/create"}`}
          className={`font-SohneLight rounded-full bg-[#0F730C] px-3 pb-1.5 pt-1 text-sm text-white ${title || body ? "" : "opacity-20"}`}
        >
          Publish
        </Link>
        <NavLink to="/my-profile" className="flex items-center gap-1">
          <img
            src={`${isLoading ? "/default-profile-picture.png" : user.image}`}
            className="rounded-full border border-[#cccs]"
            width={34}
            height={34}
          />
        </NavLink>
      </div>
    </header>
  );
}
