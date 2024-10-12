import { PostUser } from "../api/post";

export default function PostProfile({ user }: { user: PostUser | undefined }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.image || "/profile-img.jpg"}
        className="rounded-full hover:brightness-90"
        width={20}
        height={20}
      />
      <p className="font-SohneLight mt-[1px] text-xs hover:underline">
        {user?.name}
      </p>
    </div>
  );
}
