"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

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
        <ClerkLoading>
          <Loader className="w-6 h-6 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </>
  );
};

export default NavBarRoutes;
