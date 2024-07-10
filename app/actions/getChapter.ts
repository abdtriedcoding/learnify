import { db } from '@/lib/db'
import { GetChapterProps } from '@/types/index'

export const getChapter = async ({
  courseId,
  chapterId,
  userId,
}: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    })

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    })

    if (!chapter || !course) {
      throw new Error('Chapter or course not found')
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    })

    const nextChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
        isPublished: true,
        createdAt: {
          gt: chapter?.createdAt,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return {
      chapter,
      course,
      purchase,
      userProgress,
      nextChapter,
    }
  } catch (error) {
    throw new Error('Failed to fetch chapter data')
  }
}
