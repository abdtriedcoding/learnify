import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import CourseNavbar from "./_components/course-navbar";
import CourseSidebar from "./_components/course-sidebar";
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

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="min-h-screen flex">
      <aside className="fixed inset-y-0 z-40 bg-white h-[100vh] w-72 border-r-2 hidden md:block">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          purchase={purchase}
        />
      </aside>
      <main className="flex-1 overflow-y-auto md:ml-72">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          purchase={purchase}
        />
        <main className="pt-[70px] bg-gray-50">{children}</main>
      </main>
    </div>
  );
};

export default CourseLayout;
