"use client";

import * as z from "zod";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageFormProps } from "@/types/index";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { updateCourse } from "@/app/actions/updateCourse";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";

const formSchema = z.object({
  imageUrl: z.string().trim().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateCourse(data, courseId);
    toast.success("Course updated");
    toggleEdit();
    router.refresh();
  }

  return (
    <div className="border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video pt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground pt-4">
            16:9 aspect ratio recommended
          </div>
        </>
      )}
    </div>
  );
};

export default ImageForm;
