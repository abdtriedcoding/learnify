'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { type UpdateChapterProps } from '@/types'

export async function updateChapter(
  values: UpdateChapterProps,
  courseId: string,
  chapterId: string
) {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isPublished, ...value } = values
    await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...value,
      },
    })
    revalidatePath(
      `/teacher/courses/${courseId}/chapters/${chapterId}/chapters`
    )
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
