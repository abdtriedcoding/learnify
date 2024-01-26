"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function updateCourse(values: any, courseId: string) {
  const { userId } = auth();
  if (!userId) return;
  await db.course.update({
    where: {
      id: courseId,
      userId: userId,
    },
    data: {
      ...values,
    },
  });
}
