import React, { useRef, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { useUpdateUser } from "../react-query/queriesAndMutation";

export default function ProfileInformation({
  isLoggedInUser,
  name,
  image,
  currentOpen = false,
  userDataLoading,
}: {
  isLoggedInUser: boolean;
  name: string;
  image: string;
  currentOpen?: boolean;
  userDataLoading: boolean;
}) {
  const { handleLogOut, user, setUpdate } = useUserContext();

  const { mutateAsync, isPending } = useUpdateUser();

  const { id } = user;

  const [newName, setNewName] = useState<string>(name);
  const [newImage, setNewImage] = useState<string>(image);

  const [, setImageUrl] = useState<File>();

  const inputRef = useRef<HTMLInputElement>(null);

  function clickImage() {
    inputRef.current?.click();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await mutateAsync({
      name: newName ? newName : name || "",
      image: newImage ? newImage : image || "",
      userId: id || 1,
    }).then(() => {
      setUpdate((curr) => curr + 1);
    });
  }

  async function handleImageChange(e: React.FormEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const file = e.target.files[0];

    setImageUrl(file);

    const data = new FormData();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "zlqhwbog");
      data.append("cloud_name", "dknlxelxa");

      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_API_URL,
        data,
      );

      setNewImage(res.data.url);
    }
  }

  function handleCancel(e: React.FormEvent) {
    e.preventDefault();

    setNewName(name);
    setNewImage(image);
  }

  return (
    <>
      <div className="lg:hidden">
        {!currentOpen && (
          <div className="flex items-center">
            <button type="button" className="w-[30%]">
              <img
                src={`${newImage ? newImage : image || "/default-profile-picture.png"}`}
                className="w-[100%] rounded-full border border-[#ccc] sm:w-[58%]"
              />
            </button>
            {!userDataLoading ? (
              <p className="font-SohneBold ml-6 text-xl">{name}</p>
            ) : (
              <div className="skeleton skeleton-text-small ml-6"></div>
            )}
          </div>
        )}

        {currentOpen && (
          <div className="mt-6">
            <p className="font-SohneLight">Change your name</p>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="font-SohneLight mt-4 w-[40%] rounded-md border border-[#F2F2F2] bg-[#F2F2F2] px-2.5 py-2 text-sm outline-none focus:border-black focus:bg-[#F9F9F9]"
              />
              {isLoggedInUser && (
                <input
                  type="file"
                  hidden
                  ref={inputRef}
                  onChange={handleImageChange}
                />
              )}
              <p className="font-SohneLight">Change your picture</p>
              <button type="button" onClick={clickImage}>
                <img
                  src={`${newImage ? newImage : image || "/default-profile-picture.png"}`}
                  className="w-[25%] rounded-full border border-[#ccc] sm:w-[20%]"
                />
              </button>
              <button
                type="submit"
                className={`font-SohneLight w-[25%] rounded-full bg-[#156D12] px-3.5 pb-2 pt-1.5 text-sm text-white sm:w-[20%] ${!newName && "bg-[#0d430b]"}`}
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                className="font-SohneLight -mt-5 w-[25%] rounded-full border border-[#156D12] bg-transparent px-3.5 pb-2 pt-1.5 text-sm text-[#156D12] sm:w-[20%]"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
            {isLoggedInUser && (
              <button
                onClick={handleLogOut}
                className="mt-6 rounded-full bg-red px-3.5 py-1.5 text-sm text-white"
              >
                Log out
              </button>
            )}
          </div>
        )}
      </div>

      <div className="hidden w-full pl-10 lg:block">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-3">
            {isLoggedInUser && (
              <input
                type="file"
                hidden
                ref={inputRef}
                onChange={handleImageChange}
              />
            )}
            <button type="button" onClick={clickImage}>
              <img
                src={`${newImage ? newImage : image || "/default-profile-picture.png"}`}
                className="w-[34%] rounded-full border border-[#ccc]"
              />
            </button>
            {!userDataLoading ? (
              <p className="font-SohneBold ml-1 mt-1">{name}</p>
            ) : (
              <div className="skeleton skeleton-text-medium"></div>
            )}
          </div>
          {isLoggedInUser && (
            <>
              {!userDataLoading ? (
                <input
                  placeholder="Name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="font-SohneLight mt-10 w-[100%] rounded-md border border-[#F2F2F2] bg-[#F2F2F2] px-2.5 py-2 text-sm outline-none focus:border-black focus:bg-[#F9F9F9]"
                />
              ) : (
                <div className="skeleton skeleton-text-small ml-6"></div>
              )}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  className="font-SohneLight rounded-full border border-[#156D12] bg-transparent px-3.5 pb-2 pt-1.5 text-sm text-[#156D12]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`font-SohneLight rounded-full bg-[#156D12] px-3.5 pb-2 pt-1.5 text-sm text-white ${!newName && "bg-[#0d430b]"}`}
                  disabled={!newName}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </>
          )}
        </form>
        {isLoggedInUser && (
          <button
            onClick={handleLogOut}
            className="rounded-full bg-red px-3.5 py-1.5 text-sm text-white"
          >
            Log out
          </button>
        )}
      </div>
    </>
  );
}
