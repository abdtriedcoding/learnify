import Link from 'next/link'
import { db } from '@/lib/db'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Banner } from '@/components/banner'
import { ArrowLeft, Pencil } from 'lucide-react'
import ChapterActions from './_components/chapter-actions'
import ChapterTitleForm from './_components/chapter-title-form'
import ChapterVideoForm from './_components/chapter-video-form'
import ChapterAccessForm from './_components/chapter-access-form'
import ChapterDescriptionForm from './_components/chapter-description-form'

export const metadata: Metadata = {
  title: 'Chapter Creation Page',
}

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const ownCourse = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
  })

  if (!ownCourse) {
    return redirect('/')
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  })

  if (!chapter) {
    return redirect('/')
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-4">
        <Link
          href={`/teacher/courses/${params.courseId}`}
          className="flex items-center pb-6 text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to course setup
        </Link>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Chapter Creation</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <ChapterActions
            disabled={!isComplete}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 pt-16 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <Pencil className="h-5 w-5" />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>

            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <h2 className="text-xl">Access Settings</h2>
            <ChapterAccessForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl">Add a video</h2>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterIdPage
