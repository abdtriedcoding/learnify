"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

type Inputs = z.infer<typeof FormSchema>;

export async function addChapter(values: Inputs, courseId: string) {
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

    const result = FormSchema.parse(values);
    await db.chapter.create({
      data: {
        title: result.title,
        courseId: courseId,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
