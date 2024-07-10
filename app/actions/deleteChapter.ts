'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function deleteChapter(courseId: string, chapterId: string) {
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    })

    if (!chapter) return

    await db.chapter.delete({
      where: {
        id: chapterId,
      },
    })

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    })

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    revalidatePath(`/teacher/courses/${courseId}`)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
