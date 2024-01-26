"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

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
  return response;
}
