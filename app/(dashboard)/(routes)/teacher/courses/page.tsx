import { db } from "@/lib/db";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "User Courses Page",
};

const CoursePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursePage;
