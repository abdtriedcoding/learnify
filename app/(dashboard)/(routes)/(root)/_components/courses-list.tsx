import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { Badge } from '@/components/ui/badge'
import { getBase64 } from '@/app/actions/getBlurImage'
import CourseProgress from '@/components/course-progress'
import { CourseCardProps, CoursesListProps } from '@/types/index'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const CoursesList = async ({ items }: CoursesListProps) => {
  const images = items.map((item) => item.imageUrl)
  const blurImages = await Promise.all(images.map((image) => getBase64(image!)))

  if (items.length === 0) {
    return (
      <div className="mt-10 text-center text-sm text-muted-foreground">
        No courses found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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
  )
}

export default CoursesList

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
      <Card className="group transition hover:shadow-sm">
        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <Image
              alt={title}
              src={imageUrl}
              fill
              loading="lazy"
              decoding="async"
              className="scale-100 object-cover blur-0 grayscale-0 transition-opacity duration-700 ease-in-out"
              placeholder="blur"
              blurDataURL={blurredImage}
            />
          </div>
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between">
              <p className="line-clamp-1 text-sm font-medium transition group-hover:text-sky-700 md:text-base">
                {title}
              </p>
              <p className="text-xs text-slate-500">{category}</p>
            </div>
            <Badge className="w-fit bg-sky-500/10 font-light text-slate-500 hover:bg-sky-500/10">
              <BookOpen className="mr-2 h-4 w-4 text-sky-700" />
              {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-2">
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? 'success' : 'default'}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md font-medium text-slate-500 md:text-sm">
              {formatPrice(price)}
            </p>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
