import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="hidden md:flex w-64 h-full border-r flex-col overflow-y-auto bg-white shadow-sm">
      <Logo />
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
