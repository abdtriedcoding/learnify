import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { getBase64 } from "@/app/actions/getBlurImage";
import CourseProgress from "@/components/course-progress";
import { CourseCardProps, CoursesListProps } from "@/types/index";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CoursesList = async ({ items }: CoursesListProps) => {
  const images = items.map((item) => item.imageUrl);
  const blurImages = await Promise.all(
    images.map((image) => getBase64(image!))
  );

  if (items.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground mt-10">
        No courses found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
  );
};

export default CoursesList;

function CourseCard({
  id,
  title,
  imageUrl,
  blurredImage,
  chaptersLength,
  price,
  category,
  progress,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <Card className="group hover:shadow-sm transition">
        <CardContent className="p-0">
          <div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
            <Image
              alt={title}
              src={imageUrl}
              fill
              loading="lazy"
              decoding="async"
              className="duration-700 ease-in-out scale-100 blur-0 grayscale-0 object-cover"
              placeholder="blur"
              blurDataURL={blurredImage}
            />
          </div>
          <div className="flex flex-col p-2 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
                {title}
              </p>
              <p className="text-xs text-slate-500">{category}</p>
            </div>
            <Badge className="w-fit bg-sky-500/10 text-slate-500 font-light hover:bg-sky-500/10">
              <BookOpen className="w-4 h-4 mr-2 text-sky-700" />
              {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-2">
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-500">
              {formatPrice(price)}
            </p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
