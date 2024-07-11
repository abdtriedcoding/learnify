'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Image src="/error.png" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}

export default Error
