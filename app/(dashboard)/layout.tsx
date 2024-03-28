import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
