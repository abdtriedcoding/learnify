import { CourseSidebarProps } from '@/types/index'
import CourseSidebarItem from './course-sidebar-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import CourseProgress from '@/components/course-progress'

export const CourseSidebar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  return (
    <ScrollArea className="h-[100vh]">
      <div className="flex flex-col space-y-4 border-b p-8">
        <h1 className="line-clamp-2 font-semibold">{course.title}</h1>
        {purchase && (
          <CourseProgress
            variant={progressCount === 100 ? 'success' : 'default'}
            value={progressCount}
          />
        )}
      </div>
      <div className="flex w-full flex-col">
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
  )
}

export default CourseSidebar
