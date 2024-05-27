"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

const NavBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  return (
    <>
      <div className="flex gap-x-2 items-center">
        {isTeacherPage || isCoursePage ? (
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Link>
        ) : (
          <Link
            href="/teacher/courses"
            className={buttonVariants({ variant: "secondary" })}
          >
            Teacher mode
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavBarRoutes;
