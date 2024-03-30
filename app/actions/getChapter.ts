import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  courseId,
  chapterId,
  userId,
}: GetChapterProps) => {
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
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
      },
    },
  });

  if (!chapter || !course) {
    throw new Error("Chapter or course not found");
  }

  let nextChapter: Chapter | null = null;

  nextChapter = await db.chapter.findFirst({
    where: {
      courseId: courseId,
      isPublished: true,
      createdAt: {
        gt: chapter?.createdAt,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return {
    chapter,
    course,
    purchase,
    userProgress,
    nextChapter,
  };
};
