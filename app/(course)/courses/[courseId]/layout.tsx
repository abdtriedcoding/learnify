import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";
import { userProgress } from "@/app/actions/userProgress";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await userProgress(userId, course.id);

  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-80">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="flex-1 h-full overflow-y-auto">
        <div className="sticky top-0 left-0 w-full z-50">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
