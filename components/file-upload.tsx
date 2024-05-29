"use client";

import toast from "react-hot-toast";
import "@uploadthing/react/styles.css";
import { FileUploadProps } from "@/types/index";
import { UploadDropzone } from "@/lib/uploadthing";

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
