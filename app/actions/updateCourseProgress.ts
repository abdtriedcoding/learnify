'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function updateCourseProgress(
  chapterId: string,
  isCompleted: boolean
) {
  try {
    const { userId } = auth()
    if (!userId) return

    await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: chapterId,
        isCompleted,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
