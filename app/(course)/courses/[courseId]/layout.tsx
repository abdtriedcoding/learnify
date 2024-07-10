import { db } from '@/lib/db'
import { Suspense } from 'react'
import { Loader } from 'lucide-react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import CourseNavbar from './_components/course-navbar'
import CourseSidebar from './_components/course-sidebar'
import { userProgress } from '@/app/actions/userProgress'

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  const progressCount = await userProgress(userId, course.id)

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 z-40 hidden h-[100vh] w-72 border-r-2 bg-white md:block">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          purchase={purchase}
        />
      </aside>
      <main className="flex-1 overflow-y-auto md:ml-72">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          purchase={purchase}
        />
        <main className="bg-gray-50 pt-[70px]">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </main>
    </div>
  )
}

export default CourseLayout
