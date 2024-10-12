import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { usePostContext } from "../context/PostContext";
import axios from "axios";

// type FileUploaderProps = {
//   fieldChange: (FILES: File[]) => void;
//   mediaUrl: string;
// };

export default function FileUploader() {
  const { image: file, setFile } = usePostContext();

  //     {
  //   fieldChange,
  //   mediaUrl,
  // }: FileUploaderProps
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      //   fieldChange(acceptedFiles);
      const data = new FormData();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      data.append("file", acceptedFiles[0]);
      data.append("upload_preset", "zlqhwbog");
      data.append("cloud_name", "dknlxelxa");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dknlxelxa/image/upload`,
        data,
      );

      console.log(res);
      setFile(res.data.url);

      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="mt-3 flex cursor-pointer flex-col items-center justify-center bg-[#FAFAFA]"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex w-full flex-1 justify-center p-5 lg:p-6">
            <img src={fileUrl} alt="image" className="w-[50%]" />
          </div>
          <p className="file_uploader-label text-[#737373]">
            Include a high-quality image in your story to make it more inviting
            to readers.
          </p>
        </>
      ) : (
        <div className="">
          {/* <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          /> */}
          <h3 className="font-SohneLight px-16 py-20 text-center text-sm text-[#737373]">
            Include a high-quality image in your story to make it more inviting
            to readers.
          </h3>
          {/* <p className="small-regular mb-6 text-light-4">SVG, PNG, JPG</p> */}

          {/* <button className="shad-button_dark_4">Select from computer</button> */}
        </div>
      )}
    </div>
  );
}