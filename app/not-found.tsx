'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Image src="/error.png" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">Page not found!!</h2>
      <Button asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  )
}

export default NotFound
