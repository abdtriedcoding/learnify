import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { getChapter } from "@/app/actions/getChapter";
import { Card, CardHeader } from "@/components/ui/card";
import Preview from "@/components/preview";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, purchase, userProgress, nextChapter } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <VideoPlayer
        chapterId={params.chapterId}
        courseId={params.courseId}
        videoUrl={chapter.videoUrl!}
        isLocked={isLocked}
        completeOnEnd={completeOnEnd}
        nextChapterId={nextChapter?.id}
      />
      <Card className="m-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-lg lg:text-2xl font-semibold pb-2 md:pb-0">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <Separator />
      <Preview value={chapter.description!} />
    </>
  );
};

export default ChapterIdPage;
