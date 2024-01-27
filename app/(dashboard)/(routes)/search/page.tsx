import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { category } = searchParams;

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      category: category as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(courses);

  return (
    <>
      <Categories />
    </>
  );
};

export default SearchPage;
