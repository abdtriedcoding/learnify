'use client'

import { SidebarOpen } from 'lucide-react'
import CourseSidebar from './course-sidebar'
import { Button } from '@/components/ui/button'
import { CourseSidebarProps } from '@/types/index'
import { useSidebar } from '@/context/sidebar-context'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const CourseMobileSidebar = ({
  course,
  progressCount,
  purchase,
}: CourseSidebarProps) => {
  const { open, setOpen } = useSidebar()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <SidebarOpen className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
          purchase={purchase}
        />
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar
