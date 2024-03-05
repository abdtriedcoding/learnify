import Link from "next/link";
import Image from "next/image";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full w-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href={"/"}>
      <Image
        className="mx-6 my-4"
        height={130}
        width={130}
        alt="logo"
        src="https://raw.githubusercontent.com/AntonioErdeljac/next13-lms-platform/f65539069d0d88dc6a31b125b2c81b474640b16f/public/logo.svg"
      />
      </Link>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
