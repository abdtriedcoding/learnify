'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function updateCourse(values: any, courseId: string) {
  try {
    const { userId } = auth()
    if (!userId) return

    await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    })

    revalidatePath(`/teacher/courses/${courseId}`)
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
