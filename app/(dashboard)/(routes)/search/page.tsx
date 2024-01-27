import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";

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
        mode: "insensitive"
      },
      category: category as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(courses);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories />
      </div>
    </>
  );
};

export default SearchPage;
