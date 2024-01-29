const Page = async({ params }: { params: { courseId: string } }) => {
  return (
    <div>{params.courseId}</div>
  )
}

export default Page