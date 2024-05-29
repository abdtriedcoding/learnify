import { CourseSidebarProps } from "@/types/index";
import NavBarRoutes from "@/components/navbar-routes";
import CourseMobileSidebar from "./course-mobile-sidebar";

const CourseNavbar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  return (
    <div className="p-4 fixed z-50 w-full border-b flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        purchase={purchase}
      />
      <div className="justify-end ml-auto md:w-[25rem]">
        <NavBarRoutes />
      </div>
    </div>
  );
};

export default CourseNavbar;
