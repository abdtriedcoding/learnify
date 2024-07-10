'use client'

import * as z from 'zod'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChapterVideoFormProps } from '@/types/index'
import { FileUpload } from '@/components/file-upload'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import { updateChapter } from '@/app/actions/updateChapter'

const formSchema = z.object({
  videoUrl: z.string().trim().min(1),
})

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const ReactPlayer = useMemo(
    () => dynamic(() => import('react-player'), { ssr: false }),
    []
  )

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateChapter(data, courseId, chapterId)
    toast.success('Course updated')
    toggleEdit()
    router.refresh()
  }

  return (
    <div className="rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video pt-2">
            <ReactPlayer
              url={initialData.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="pt-4 text-xs text-muted-foreground">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="pt-2 text-xs text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  )
}

export default ChapterVideoForm
