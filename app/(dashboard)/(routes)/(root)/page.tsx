import { getDashboardCourses } from "@/app/actions/getDashboardCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "../search/_components/courses-list";

const HomePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-4 space-y-4">
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default HomePage;
