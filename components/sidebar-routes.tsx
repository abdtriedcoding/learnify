"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SidebarItemProps } from "@/types/index";
import { useSidebar } from "@/context/sidebar-context";
import { buttonVariants } from "@/components/ui/button";
import { guestRoutes, teacherRoutes } from "@/constants/index";

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full space-y-1">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      onClick={() => {
        setOpen?.(false);
      }}
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "justify-start py-6 px-3",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <Icon
        className={cn(
          "text-slate-500 h-5 w-5 mr-2 animate-spin-once",
          isActive && "text-sky-700"
        )}
      />
      {label}
    </Link>
  );
}
