'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { type SidebarItemProps } from '@/types/index'
import { useSidebar } from '@/context/sidebar-context'
import { buttonVariants } from '@/components/ui/button'
import { guestRoutes, teacherRoutes } from '@/constants/index'

const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.includes('/teacher')

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex w-full flex-col space-y-1">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      onClick={() => {
        setOpen?.(false)
      }}
      href={href}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'justify-start px-3 py-6',
        isActive &&
          'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700'
      )}
    >
      <Icon
        className={cn(
          'mr-2 h-5 w-5 animate-spin-once text-slate-500',
          isActive && 'text-sky-700'
        )}
      />
      {label}
    </Link>
  )
}
