import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <aside className="fixed inset-y-0 pt-[70px] z-40 bg-white h-[100vh] w-72 border-r-2 hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto md:ml-72 pt-[70px] bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
