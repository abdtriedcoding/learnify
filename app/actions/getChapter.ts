import { db } from "@/lib/db";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({ courseId, chapterId, userId }: GetChapterProps) => {
  // TODO check if user purchase this or not

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      }
    }
  });

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

  const userProgress = await db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      }
    }
  });


  if (!chapter || !course) {
    throw new Error("Chapter or course not found");
  }

  // TODO automatically start new chapter when chapter is completed

  // TODO get user progress

  return {
    chapter,
    course,
    purchase,
    userProgress
  };
};
