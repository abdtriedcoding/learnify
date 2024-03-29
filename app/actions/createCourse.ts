"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { FormSchema } from "@/lib/validation";

type Inputs = z.infer<typeof FormSchema>;

export async function createCourse(values: Inputs) {
  const { userId } = auth();
  if (!userId) return;
  try {
    const result = FormSchema.parse(values);
    const response = await db.course.create({
      data: {
        userId,
        title: result.title,
      },
    });

    revalidatePath("/teacher/courses");
    return response;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
