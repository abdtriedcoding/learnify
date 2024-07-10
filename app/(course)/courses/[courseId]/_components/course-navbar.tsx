import { CourseSidebarProps } from '@/types/index'
import NavBarRoutes from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'

const CourseNavbar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  return (
    <div className="fixed z-50 flex w-full items-center border-b bg-white p-4 shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        purchase={purchase}
      />
      <div className="ml-auto justify-end md:w-[25rem]">
        <NavBarRoutes />
      </div>
    </div>
  )
}

export default CourseNavbar
