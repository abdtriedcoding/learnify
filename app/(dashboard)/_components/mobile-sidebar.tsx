import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Link href={"/"}>
          <Image
            className="mx-6 my-4"
            height={130}
            width={130}
            alt="logo"
            src="https://raw.githubusercontent.com/AntonioErdeljac/next13-lms-platform/f65539069d0d88dc6a31b125b2c81b474640b16f/public/logo.svg"
          />
        </Link>
        <SidebarRoutes />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
