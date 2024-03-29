"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function unpublishChapter(courseId: string, chapterId: string) {
  try {
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
        isPublished: false,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
