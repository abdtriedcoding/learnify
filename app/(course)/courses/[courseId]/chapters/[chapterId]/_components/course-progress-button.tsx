"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, XCircle } from "lucide-react";
import { CourseProgressButtonProps } from "@/types/index";
import { updateCourseProgress } from "@/app/actions/updateCourseProgress";

const CourseProgressButton = ({
  chapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    await updateCourseProgress(chapterId, !isCompleted);
    toast.success("Progress updated");
    router.refresh();
    setIsLoading(false);
  };

  const Icon = isCompleted ? XCircle : ArrowRight;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Complete and continue"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

export default CourseProgressButton;
