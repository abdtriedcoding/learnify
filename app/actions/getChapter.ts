import { db } from "@/lib/db";

interface GetChapterProps {
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({ courseId, chapterId }: GetChapterProps) => {
  // TODO check if user purchase this or not

  const course = await db.course.findUnique({
    where: {
      isPublished: true,
      id: courseId,
    },
    select: {
      price: true,
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      isPublished: true,
    },
  });

  if (!chapter || !course) {
    throw new Error("Chapter or course not found");
  }

  // TODO automatically start new chapter when chapter is completed

  // TODO get user progress

  return {
    chapter,
    course,
  };
};
