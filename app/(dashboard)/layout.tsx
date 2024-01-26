import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex h-full w-64">
        <Sidebar />
      </div>
      <main className="flex-1 h-full overflow-y-auto">
        <div className="sticky top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
