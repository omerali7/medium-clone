import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import { usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";

export default function Edit() {
  const navigate = useNavigate();
  const { title, content, onSubmit, isCreatingPost } = usePostContext();

  const { user, isLoading } = useUserContext();

  if (isLoading) return null;

  return (
    <div id="overlay-create">
      <form
        className="absolute inset-0 m-auto h-[74%] w-[72%] sm:w-[50%]"
        onSubmit={(e) => onSubmit(e, user.id || 1)}
      >
        <IoCloseOutline
          className="ml-auto h-6 w-6 cursor-pointer font-thin"
          onClick={() => navigate("/create")}
        />
        <div className="grid h-full grid-cols-1 justify-items-center pt-20">
          <div className="w-[100%] lg:w-[60%]">
            <h3 className="font-SohneBold text-lg">Story Preview</h3>
            <FileUploader />
            <div className="flex flex-col divide-y divide-[#ccc]">
              <h3 className="font-SohneBold mt-3 pb-1 text-lg">{title}</h3>
              <p className="font-SohneLight line-clamp-3 pt-4 text-sm text-[#737373]">
                {content}
              </p>
              <button
                className={`font-SohneLight mt-6 self-center rounded-full ${!isCreatingPost ? "bg-[#0F730C]" : "bg-[#0b5209]"} px-4 pb-2.5 pt-2 text-sm text-white`}
              >
                {!isCreatingPost ? "Publish now" : "Creating Post"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
