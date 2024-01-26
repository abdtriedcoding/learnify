import { UserButton } from "@clerk/nextjs"

const NavBarRoutes = () => {
  return (
    <div className="ml-auto">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default NavBarRoutes