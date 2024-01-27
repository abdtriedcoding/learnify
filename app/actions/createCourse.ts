"use server";

import { db } from "@/lib/db";
import { FormSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof FormSchema>;

export async function createCourse(values: Inputs) {
  const { userId } = auth();
  if (!userId) return;
  const result = FormSchema.parse(values);
  const response = await db.course.create({
    data: {
      userId,
      title: result.title,
    },
  });
  revalidatePath("/teacher/courses");
  return response;
}
