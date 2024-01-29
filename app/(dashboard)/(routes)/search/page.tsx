import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCourses } from "@/app/actions/getCourses";
import SearchInput from "@/components/search-input";
import Categories from "./_components/categories";
import CoursesList from "./_components/courses-list";

interface PageProps {
  searchParams: {
    title: string;
    category: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

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

export default Page;
