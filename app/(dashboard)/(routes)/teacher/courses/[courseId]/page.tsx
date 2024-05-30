import { db } from "@/lib/db";
import { Metadata } from "next";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Banner } from "@/components/banner";
import Actions from "./_components/actions";
import ImageForm from "./_components/image-form";
import TitleForm from "./_components/title-form";
import PriceForm from "./_components/price-form";
import CategoryForm from "./_components/category-form";
import ChaptersForm from "./_components/chapters-form";
import DescriptionForm from "./_components/description-form";

export const metadata: Metadata = {
  title: "Course Creation Page",
};

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.category,
    course.imageUrl,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-16">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <Pencil className="w-5 h-5" />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <h2 className="text-xl">Course chapters</h2>
            <ChaptersForm initialData={course} courseId={course.id} />
            <h2 className="text-xl">Sell your course</h2>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
