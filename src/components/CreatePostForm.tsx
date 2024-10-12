import { useEffect, useRef } from "react";

export default function CreatePostForm({
  title,
  setTile,
  body,
  setBody,
}: {
  title: string;
  setTile: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [body]);

  return (
    <form className="container-form">
      <textarea
        placeholder="Title"
        className="font-GTSuperBold w-full resize-none text-4xl tracking-wide outline-none placeholder:text-[#B3B3B1]"
        value={title}
        onChange={(e) => setTile(e.target.value)}
      />
      <textarea
        ref={textareaRef}
        placeholder="Tell your story..."
        className="font-GTSuperMedium w-full resize-none text-xl outline-none placeholder:text-[#B3B3B1]"
        value={body}
        rows={1}
        onChange={(e) => setBody(e.target.value)}
      />
    </form>
  );
}
