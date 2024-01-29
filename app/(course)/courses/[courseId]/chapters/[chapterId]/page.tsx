import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import { getChapter } from "@/app/actions/getChapter";
import VideoPlayer from "./_components/video-player";

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course } = await getChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree;

  return (
    <div>
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer videoUrl={chapter.videoUrl!} isLocked={isLocked} />
        </div>
      </div>
    </div>
  );
};

export default Page;
