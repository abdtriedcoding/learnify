import NavBarRoutes from "@/components/navbar-routes";
import { Chapter, Course } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: Chapter[];
  };
}

const CourseNavbar = ({ course }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} />
      <NavBarRoutes />
    </div>
  );
};

export default CourseNavbar;
