import { db } from '@/lib/db'
import { userProgress } from './userProgress'
import { CourseWithProgress, DashboardCourses } from '@/types/index'

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  const purchasedCourses = await db.purchase.findMany({
    where: {
      userId: userId,
    },
    select: {
      course: {
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  const courses = purchasedCourses.map(
    (purchase) => purchase.course
  ) as CourseWithProgress[]

  for (let course of courses) {
    const progress = await userProgress(userId!, course.id)
    course['progress'] = progress
  }

  const completedCourses = courses.filter((course) => course.progress === 100)
  const coursesInProgress = courses.filter(
    (course) => (course.progress ?? 0) < 100
  )

  return {
    completedCourses,
    coursesInProgress,
  }
}
