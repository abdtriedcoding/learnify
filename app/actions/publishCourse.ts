"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function publishCourse(courseId: string) {
  try {
    const { userId } = auth();
    if (!userId) return;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!course) return;

    await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        isPublished: true,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
