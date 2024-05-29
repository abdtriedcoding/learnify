import { CourseSidebarProps } from "@/types/index";
import CourseSidebarItem from "./course-sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseProgress from "@/components/course-progress";

export const CourseSidebar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  return (
    <ScrollArea className="h-[100vh]">
      <div className="p-8 flex flex-col border-b space-y-4">
        <h1 className="font-semibold line-clamp-2">{course.title}</h1>
        {purchase && (
          <CourseProgress
            variant={progressCount === 100 ? "success" : "default"}
            value={progressCount}
          />
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default CourseSidebar;
