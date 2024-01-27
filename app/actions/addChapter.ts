"use server";

import { db } from "@/lib/db";
import { FormSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

type Inputs = z.infer<typeof FormSchema>;

export async function addChapter(values: Inputs, courseId: string) {
  const { userId } = auth();
  if (!userId) return;
  const result = FormSchema.parse(values);
  const response = await db.chapter.create({
    data: {
      title: result.title,
      courseId: courseId,
    },
  });
  return response;
}
