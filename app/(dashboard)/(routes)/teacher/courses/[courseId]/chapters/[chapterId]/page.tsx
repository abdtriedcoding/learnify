const Page = ({ params }: { params: { chapterId: string } }) => {
  return (
    <div>{params.chapterId}</div>
  )
}

export default Page