import Logo from "./logo";
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
        <Logo />
        <SidebarRoutes />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
