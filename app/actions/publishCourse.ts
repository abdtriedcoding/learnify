'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function publishCourse(courseId: string) {
  try {
    const { userId } = auth()
    if (!userId) return

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      include: {
        chapters: true,
      },
    })

    if (!course) return

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    )

    if (!hasPublishedChapter) {
      throw new Error('Missing Form Fields!')
    }

    await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        isPublished: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
