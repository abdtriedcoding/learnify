import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { userProgress } from './userProgress'
import { CourseWithProgress, GetCourses } from '@/types/index'

export const getCourses = async ({
  title,
  category,
}: GetCourses): Promise<CourseWithProgress[]> => {
  const { userId } = auth()

  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        }),
        ...(category && {
          category,
        }),
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        ...(userId && {
          purchases: {
            where: {
              userId,
            },
            select: {
              id: true,
            },
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!userId) {
      // If no userId, return courses without progress
      return courses.map((course) => ({
        ...course,
        progress: null,
      }))
    }

    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          }
        }

        const progressPercentage = await userProgress(userId, course.id)

        return {
          ...course,
          progress: progressPercentage,
        }
      })
    )
    return coursesWithProgress
  } catch (error) {
    return []
  }
}
