'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/sidebar-context'
import { CourseSidebarItemProps } from '@/types/index'
import { CheckCircle, Lock, PlayCircle } from 'lucide-react'

const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  const isActive = pathname?.includes(id)
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle

  return (
    <Link
      href={`/courses/${courseId}/chapters/${id}`}
      onClick={() => {
        setOpen?.(false)
      }}
      className={cn(
        'flex items-center gap-x-2 border-b p-5 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600',
        isActive &&
          'bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700',
        isCompleted && 'text-emerald-700 hover:text-emerald-700',
        isCompleted && isActive && 'bg-emerald-200/20'
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icon
          className={cn(
            'h-5 w-5 text-slate-500',
            isActive && 'text-slate-700',
            isCompleted && 'text-emerald-700'
          )}
        />
        {label}
      </div>
    </Link>
  )
}

export default CourseSidebarItem
