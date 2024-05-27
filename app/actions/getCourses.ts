import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import { userProgress } from "./userProgress";

type CourseWithProgress = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string | null;
  title?: string;
  category?: string;
};

export const getCourses = async ({
  userId,
  title,
  category,
}: GetCourses): Promise<CourseWithProgress[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title as string,
          mode: "insensitive",
        },
        category: category as string,
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
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userId) {
      // If no userId, return courses without progress
      return courses.map((course) => ({
        ...course,
        progress: null,
      }));
    }

    const coursesWithProgress: CourseWithProgress[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPercentage = await userProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    return [];
  }
};
