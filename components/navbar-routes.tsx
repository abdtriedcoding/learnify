'use client'

import Link from 'next/link'
import { LogIn, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { buttonVariants } from '@/components/ui/button'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function NavBarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.includes('/courses')

  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-9 w-[92px]" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className="flex items-center gap-x-2">
            {isTeacherPage || isCoursePage ? (
              <Link
                href="/"
                className={buttonVariants({ variant: 'secondary' })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Exit
              </Link>
            ) : (
              <Link
                href="/teacher/courses"
                className={buttonVariants({ variant: 'secondary' })}
              >
                Teacher mode
              </Link>
            )}

            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: 'secondary' })}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </SignedOut>
      </ClerkLoaded>
    </>
  )
}
