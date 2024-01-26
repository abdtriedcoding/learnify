import NavBarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavBarRoutes />
    </div>
  );
};

export default Navbar;
