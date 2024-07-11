'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { type CourseEnrollButtonProps } from '@/types/index'

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/checkout`, { courseId })

      window.location.assign(response.data.url as string)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton
