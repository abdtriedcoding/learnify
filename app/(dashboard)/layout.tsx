import { Suspense } from 'react'
import { Loader } from 'lucide-react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <aside className="fixed inset-y-0 z-40 hidden h-[100vh] w-72 border-r-2 bg-white pt-[70px] md:block">
          <Sidebar />
        </aside>
        <main className="min-h-screen flex-1 overflow-y-auto bg-gray-50 pt-[70px] md:ml-72">
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <Loader className="h-5 w-5 animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
