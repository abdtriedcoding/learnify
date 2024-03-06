import { Course } from "@prisma/client";
import CourseCard from "./course-card";
import { getBase64 } from "@/app/actions/getBlurImage";

type CourseWithProgress = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgress[];
}

const CoursesList = async ({ items }: CoursesListProps) => {
  const images = items.map((item) => item.imageUrl);
  const blurImages = await Promise.all(
    images.map((image) => getBase64(image!))
  );

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            blurredImage={blurImages[index] as string}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress!}
            category={item?.category!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
