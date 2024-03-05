import MobileSidebar from "./mobile-sidebar";
import NavBarRoutes from "@/components/navbar-routes";

const Navbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavBarRoutes />
    </div>
  );
};

export default Navbar;
