"use client";

import { Loader2, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  isLocked: boolean;
}

const VideoPlayer = ({ isLocked, videoUrl }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

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
          controls
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
