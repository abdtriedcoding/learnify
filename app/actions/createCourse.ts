"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
});

type Inputs = z.infer<typeof FormSchema>;

export async function createCourse(values: Inputs) {
  try {
    const { userId } = auth();
    if (!userId) return;
    const result = FormSchema.safeParse(values);

    if (!result.success) {
      throw new Error("Something went wrong!");
    }

    const response = await db.course.create({
      data: {
        userId,
        title: result.data.title,
      },
    });

    revalidatePath("/teacher/courses");
    return response;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}
