"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string) {
  const { userId } = auth();
  if (!userId) return;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
  });

  if (!course) return;

  await db.course.delete({
    where: {
      id: courseId,
    },
  });

  revalidatePath("/teacher/courses");
}
