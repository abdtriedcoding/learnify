'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { type ActionsProps } from '@/types/index'
import { ConfirmModal } from '@/components/confirm-modal'
import { deleteCourse } from '@/app/actions/deleteCourse'
import { publishCourse } from '@/app/actions/publishCourse'
import { unpublishCourse } from '@/app/actions/unpublishCourse'
import { useConfettiStore } from '@/hooks/use-confetti-store'

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)
    if (isPublished) {
      await unpublishCourse(courseId)
      toast.success('Course unpublished')
    } else {
      await publishCourse(courseId)
      toast.success('Course published')
      confetti.onOpen()
    }

    router.refresh()
    setIsLoading(false)
  }

  const onDelete = async () => {
    setIsLoading(true)
    await deleteCourse(courseId)
    toast.success('Course deleted')
    router.refresh()
    router.push(`/teacher/courses`)
    setIsLoading(false)
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default Actions
