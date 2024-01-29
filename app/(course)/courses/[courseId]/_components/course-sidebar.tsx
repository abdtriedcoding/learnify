import { auth } from "@clerk/nextjs";
import { Chapter, Course } from "@prisma/client"
import { redirect } from "next/navigation";

import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter)[]
  };
};

const CourseSidebar = async ({
  course,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

// TODO: Get payment status to show different icons and other edge cases.

  return (
    <div className="h-full w-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="px-8 py-4 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            courseId={course.id}
            isLocked={!chapter.isFree}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar;
