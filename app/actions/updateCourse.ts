'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { type UpdateCourseProps } from '@/types'

export async function updateCourse(
  values: UpdateCourseProps,
  courseId: string
) {
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
