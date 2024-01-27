"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function publishChapter(courseId: string, chapterId: string) {
  const { userId } = auth();
  if (!userId) return;

  const courseOwner = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
  });

  if (!courseOwner) {
    return;
  }

  await db.chapter.update({
    where: {
      id: chapterId,
      courseId: courseId,
    },
    data: {
      isPublished: true,
    },
  });
}
