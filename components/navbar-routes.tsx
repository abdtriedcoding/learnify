"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const NavBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  return (
    <>
      <ClerkLoading>
        {/* <Loader className="w-6 h-6 animate-spin" /> */}
        <Skeleton className="h-9 w-[92px]" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <div className="flex gap-x-2 items-center">
            {isTeacherPage || isCoursePage ? (
              <Link
                href="/"
                className={buttonVariants({ variant: "secondary" })}
              >
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
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "secondary" })}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
};

export default NavBarRoutes;
