import { auth } from "@clerk/nextjs/server";
import { HomePageProps } from "@/types/index";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import CoursesList from "./_components/courses-list";
import { getCourses } from "@/app/actions/getCourses";

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { userId } = auth();

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default HomePage;
