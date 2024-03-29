import MobileSidebar from "./mobile-sidebar";
import NavBarRoutes from "@/components/navbar-routes";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 w-full z-50 p-[14px] border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavBarRoutes />
    </div>
  );
};

export default Navbar;
