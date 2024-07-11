import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from '../(root)/_components/info-card'
import CoursesList from '../(root)/_components/courses-list'
import { getDashboardCourses } from '@/app/actions/getDashboardCourses'

export const metadata: Metadata = {
  title: 'Dashboard Page',
}

const DashboardPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId)

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          color="text-sky-700"
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          color="text-emerald-700"
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}

export default DashboardPage
