'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Title is required',
  }),
})

type Inputs = z.infer<typeof formSchema>

export async function addChapter(values: Inputs, courseId: string) {
  try {
    const { userId } = auth()
    if (!userId) return

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    })

    if (!courseOwner) {
      return
    }

    const result = formSchema.safeParse(values)

    if (!result.success) {
      throw new Error('Something went wrong!')
    }

    await db.chapter.create({
      data: {
        title: result.data.title,
        courseId: courseId,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
