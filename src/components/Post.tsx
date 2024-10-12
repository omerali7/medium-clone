import { Link } from "react-router-dom";
import PostDetails from "./PostDetails";
import PostProfile from "./PostProfile";
import { Post as PostType } from "../api/post";
import { MdDeleteOutline } from "react-icons/md";

type PostProps = {
  profile?: boolean;
};

export default function Post({
  title,
  content,
  image,
  id,
  createdAt,
  user,
  profile,
}: PostType & PostProps) {
  return (
    <Link to={`/post/${id}`} className="inline-block">
      <div className="grid w-[100%] cursor-pointer grid-cols-12 gap-10 pb-8 pt-6">
        <div className="col-span-8 flex flex-col">
          <PostProfile user={user} />
          <h1 className="font-SohneBoldNew mt-3 text-[22px] leading-[1.4] text-[#242424]">
            {title}
          </h1>
          <p className="font-SohneLight mt-2 line-clamp-3 text-[15px] text-[#6B6B6B]">
            {content}
          </p>
          <PostDetails createdAt={createdAt || ""} />
        </div>
        <div className="col-span-4 mb-4 ml-4 self-end">
          {profile && <MdDeleteOutline className="mb-8 ml-auto text-red" />}
          <img src={image} className="w-full" />
        </div>
      </div>
    </Link>
  );
}
