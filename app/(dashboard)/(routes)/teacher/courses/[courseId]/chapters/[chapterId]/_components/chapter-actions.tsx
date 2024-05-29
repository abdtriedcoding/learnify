"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChapterActionsProps } from "@/types/index";
import { ConfirmModal } from "@/components/confirm-modal";
import { deleteChapter } from "@/app/actions/deleteChapter";
import { publishChapter } from "@/app/actions/publishChapter";
import { unpublishChapter } from "@/app/actions/unpublishChapter";

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    if (isPublished) {
      await unpublishChapter(courseId, chapterId);
      toast.success("Chapter unpublished");
    } else {
      await publishChapter(courseId, chapterId);
      toast.success("Chapter published");
    }
    router.refresh();
    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await deleteChapter(courseId, chapterId);
    toast.success("Chapter deleted");
    router.refresh();
    router.push(`/teacher/courses/${courseId}`);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
