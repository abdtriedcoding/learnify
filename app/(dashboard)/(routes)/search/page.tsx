import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import CoursesList from "./_components/courses-list";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { category, title } = searchParams;

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      title: {
        contains: title as string,
        mode: "insensitive",
      },
      category: category as string,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(courses);

  return (
    <>
      <div className="px-4 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-4 space-y-4">
        <Categories />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
