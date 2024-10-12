import CreatePostForm from "../components/CreatePostForm";
import CreatePostHeader from "../components/CreatePostHeader";
import { Outlet } from "react-router-dom";
import { usePostContext } from "../context/PostContext";

export default function CreatePost() {
  const {
    title,
    setTitle,
    content: body,
    setContent: setBody,
  } = usePostContext();

  return (
    <>
      <div className="sm:container-create h-full px-6 sm:p-0">
        <CreatePostHeader title={title} body={body} />
      </div>
      <CreatePostForm
        title={title}
        setTile={setTitle}
        body={body}
        setBody={setBody}
      />
      <Outlet />
    </>
  );
}
