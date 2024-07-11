import Categories from './_components/categories'
import { type HomePageProps } from '@/types/index'
import SearchInput from '@/components/search-input'
import CoursesList from './_components/courses-list'
import { getCourses } from '@/app/actions/getCourses'

const HomePage = async ({ searchParams }: HomePageProps) => {
  const courses = await getCourses({
    ...searchParams,
  })

  return (
    <>
      <div className="block px-4 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-4">
        <Categories />
        <CoursesList items={courses} />
      </div>
    </>
  )
}

export default HomePage
