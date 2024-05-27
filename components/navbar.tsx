import Link from "next/link";
import Image from "next/image";
import SearchInput from "@/components/search-input";
import NavBarRoutes from "@/components/navbar-routes";
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = () => {
  return (
    <div className="p-4 fixed z-50 w-full border-b flex justify-between items-center bg-white shadow-sm">
      <MobileSidebar />
      <Logo />
      <SearchInput />
      <NavBarRoutes />
    </div>
  );
};

export default Navbar;

function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo.svg"}
        alt="learnify"
        width={40}
        height={40}
        className="hidden md:block"
      />
    </Link>
  );
}
