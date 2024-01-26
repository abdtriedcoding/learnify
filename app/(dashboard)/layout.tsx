import Sidebar from "./_components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-56">
        <Sidebar />
      </div>
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;