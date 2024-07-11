import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const handleAuth = () => {
  const { userId } = auth()

  if (!userId) throw new Error('Unauthorized')
  return { userId }
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      // Add your code here if needed
    }),
  chapterVideo: f({ video: { maxFileSize: '512GB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      // Add your code here if needed
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
