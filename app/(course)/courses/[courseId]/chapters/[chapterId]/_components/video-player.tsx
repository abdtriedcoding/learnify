"use client";

import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { VideoPlayerProps } from "@/types/index";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { updateCourseProgress } from "@/app/actions/updateCourseProgress";

const VideoPlayer = ({
  courseId,
  chapterId,
  isLocked,
  videoUrl,
  nextChapterId,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const confetti = useConfettiStore();

  const ReactPlayer = useMemo(
    () => dynamic(() => import("react-player"), { ssr: false }),
    []
  );

  const handleReady = () => {
    setIsLoading(false);
  };

  const handleBuffer = () => {
    setIsLoading(true);
  };

  const onEnd = async () => {
    if (completeOnEnd) {
      await updateCourseProgress(chapterId, true);
      if (!nextChapterId) {
        confetti.onOpen();
      }
      toast.success("Progress updated");
      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    }
    router.refresh();
  };

  return (
    <div className="relative aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={videoUrl}
          onReady={handleReady}
          onBuffer={handleBuffer}
          onEnded={onEnd}
          controls
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
