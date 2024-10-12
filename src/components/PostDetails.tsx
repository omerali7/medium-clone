import { FaHandsClapping } from "react-icons/fa6";
import { formatDate } from "../utils/utils";

export default function PostDetails({ createdAt }: { createdAt: string }) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <p className="font-SohneLight text-sm text-[#6B6B6B]">
        {formatDate(createdAt)}
      </p>
      <p className="font-SohneLight flex items-center gap-1 text-sm text-[#6B6B6B]">
        <FaHandsClapping /> <span>23</span>
      </p>
    </div>
  );
}